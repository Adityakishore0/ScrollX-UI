'use client';
import React, { useState, useEffect, useRef } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { twMerge } from 'tailwind-merge';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import {
  Copy,
  Check,
  AlertCircle,
  ChevronRight,
  Monitor,
  Tablet,
  Smartphone,
  Maximize,
  RotateCcw,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadedNotification } from '@/components/loaded-notification';
import {
  getBlockSourceAction,
  type BlockFile,
} from '../actions/getBlockSourceAction';
import { ThemedSyntaxHighlighter } from '@/components/themedsyntax-highlighter';
import blocksRegistry from '@/app/registry/blocks-registry';
import BlocksLoader from '@/components/blocks-loader';
import { FileTree, buildTree } from '@/components/FileTree';
import { useClipboard } from '@/utils/useClipboard';

type BlocksPreviewProps = {
  name: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

type Viewport = 'desktop' | 'tablet' | 'mobile';

const viewportConfig: Record<
  Viewport,
  { icon: React.ReactNode; label: string; width: string }
> = {
  desktop: {
    icon: <Monitor className='h-4 w-4' />,
    label: 'Desktop',
    width: '100%',
  },
  tablet: {
    icon: <Tablet className='h-4 w-4' />,
    label: 'Tablet',
    width: '768px',
  },
  mobile: {
    icon: <Smartphone className='h-4 w-4' />,
    label: 'Mobile',
    width: '390px',
  },
};

export default function BlocksPreview({
  name,
  className = '',
  children,
}: BlocksPreviewProps) {
  const [activeTab, setActiveTab] = useState('preview');
  const [blockFiles, setBlockFiles] = useState<BlockFile[]>([]);
  const [selectedPath, setSelectedPath] = useState('page.tsx');
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [previewHeight, setPreviewHeight] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const previewContentRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const Block = blocksRegistry[name];
  const activeSource =
    blockFiles.find((f) => f.relativePath === selectedPath)?.source ?? '';
  const { copied, copyFailed, copy } = useClipboard();

  useEffect(() => {
    const currentRef = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !hasLoaded) setHasLoaded(true);
      },
      { rootMargin: '200px', threshold: 0.01 },
    );
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasLoaded]);

  useEffect(() => {
    if (!hasLoaded) return;
    const fetchFiles = async () => {
      try {
        const result = await getBlockSourceAction(name);
        setBlockFiles(result.files);
        setSelectedPath(
          result.files.find((f) => f.relativePath === 'page.tsx')
            ? 'page.tsx'
            : (result.files[0]?.relativePath ?? ''),
        );
      } catch (error) {
        console.error('Error fetching block files:', error);
        setBlockFiles([
          {
            relativePath: 'page.tsx',
            source: `// Error loading source code for ${name}`,
          },
        ]);
      }
    };
    fetchFiles();
  }, [name, hasLoaded]);

  useEffect(() => {
    if (!previewContentRef.current) return;
    if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    resizeObserverRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = entry.contentRect.height;
        if (h > 0) setPreviewHeight(h);
      }
    });
    resizeObserverRef.current.observe(previewContentRef.current);
    return () => resizeObserverRef.current?.disconnect();
  }, [hasLoaded, refreshKey]);

  const codeHeight = previewHeight > 0 ? previewHeight : 500;
  const tree = buildTree(blockFiles);

  return (
    <div ref={containerRef}>
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <div className='flex items-center justify-between border-b border-border'>
          <Tabs.List className='flex'>
            {['preview', 'code'].map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab}
                className={twMerge(
                  'relative px-4 py-2 text-sm font-medium rounded-t-md overflow-hidden transition-colors duration-500',
                  activeTab === tab
                    ? 'text-background'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span className='relative z-10 capitalize'>{tab}</span>
                <span
                  className={twMerge(
                    'absolute bottom-0 left-0 h-full w-full origin-bottom scale-y-0 transition-transform duration-500 ease-out z-0',
                    activeTab === tab
                      ? 'scale-y-100 bg-foreground'
                      : 'bg-transparent',
                  )}
                />
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {activeTab === 'preview' && (
            <div className='flex items-center gap-0.5 pr-2'>
              {(Object.keys(viewportConfig) as Viewport[]).map((v) => (
                <Button
                  key={v}
                  variant='ghost'
                  size='icon'
                  onClick={() => setViewport(v)}
                  title={viewportConfig[v].label}
                  className={twMerge(
                    'h-8 w-8',
                    viewport === v ? 'bg-accent text-foreground' : '',
                  )}
                >
                  {viewportConfig[v].icon}
                </Button>
              ))}
              <div className='mx-1 h-4 w-px bg-border' />
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setRefreshKey((k) => k + 1)}
                title='Refresh'
                className='h-8 w-8'
              >
                <RotateCcw className='h-4 w-4' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => window.open(`/live-preview/${name}`, '_blank')}
                title='Fullscreen'
                className='h-8 w-8'
              >
                <Maximize className='h-4 w-4' />
              </Button>
            </div>
          )}
        </div>

        <div className='my-6 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900'>
          <div className='overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700'>
            <Tabs.Content
              value='preview'
              className='preview relative flex min-h-87.5 w-full justify-center p-2 sm:p-10 items-center bg-background'
            >
              <div
                className='w-full flex bg-background'
                style={{ animationPlayState: isInView ? 'running' : 'paused' }}
              >
                <div
                  ref={previewContentRef}
                  className={twMerge(
                    'transition-all duration-300 not-prose',
                    className,
                  )}
                  style={{ width: viewportConfig[viewport].width }}
                >
                  {!hasLoaded ? (
                    <div className='flex items-center justify-center w-full min-h-96'>
                      <BlocksLoader />
                    </div>
                  ) : (
                    <>
                      <LoadedNotification name={name} />
                      {Block ? (
                        <Block key={refreshKey} />
                      ) : children ? (
                        children
                      ) : (
                        <p>Block &quot;{name}&quot; not found in registry</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value='code' className='m-0'>
              {!hasLoaded ? (
                <div
                  className='flex items-center justify-center w-full bg-muted'
                  style={{ height: codeHeight }}
                >
                  <BlocksLoader />
                </div>
              ) : (
                <div
                  className='flex overflow-hidden bg-muted'
                  style={{ height: codeHeight }}
                >
                  {!sidebarCollapsed && (
                    <FileTree
                      tree={tree}
                      selectedPath={selectedPath}
                      onSelect={setSelectedPath}
                    />
                  )}

                  <div className='relative flex flex-col flex-1 min-w-0'>
                    <div className='flex items-center gap-1 shrink-0 border-b border-zinc-200 dark:border-zinc-700 px-4 py-2 text-xs text-muted-foreground select-none'>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className='mr-2 h-7 w-7'
                        title={
                          sidebarCollapsed ? 'Show sidebar' : 'Hide sidebar'
                        }
                      >
                        {sidebarCollapsed ? (
                          <PanelLeft className='h-4 w-4' />
                        ) : (
                          <PanelLeftClose className='h-4 w-4' />
                        )}
                      </Button>
                      {selectedPath.split('/').map((seg, i, arr) => (
                        <React.Fragment key={i}>
                          <span
                            className={
                              i === arr.length - 1 ? 'text-foreground' : ''
                            }
                          >
                            {seg}
                          </span>
                          {i < arr.length - 1 && (
                            <ChevronRight className='h-3 w-3 text-muted-foreground/40' />
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <Button
                      variant='secondary'
                      size='icon'
                      onClick={() => copy(activeSource)}
                      className={twMerge(
                        'absolute right-4 top-1 z-10 h-9 w-9',
                        copied &&
                          'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/40',
                        copyFailed &&
                          'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/40',
                      )}
                      title={
                        copied
                          ? 'Copied!'
                          : copyFailed
                            ? 'Copy failed'
                            : 'Copy code'
                      }
                    >
                      {copied ? (
                        <Check className='h-4 w-4 text-green-600 dark:text-green-400' />
                      ) : copyFailed ? (
                        <AlertCircle className='h-4 w-4 text-red-600 dark:text-red-400' />
                      ) : (
                        <Copy className='h-4 w-4' />
                      )}
                    </Button>

                    {(copied || copyFailed) && (
                      <div className='absolute right-4 top-20 z-30 animate-in fade-in-0 slide-in-from-top-2 duration-300'>
                        <div
                          className={twMerge(
                            'rounded-md border px-3 py-2 shadow-lg backdrop-blur-xs',
                            copied
                              ? 'bg-green-100/90 dark:bg-green-900/80 border-green-200 dark:border-green-700'
                              : 'bg-red-100/90 dark:bg-red-900/80 border-red-200 dark:border-red-700',
                          )}
                        >
                          <div className='flex items-center space-x-2'>
                            {copied ? (
                              <>
                                <Check className='h-4 w-4 text-green-600 dark:text-green-400' />
                                <span className='text-sm font-medium text-green-800 dark:text-green-200'>
                                  Copied!
                                </span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className='h-4 w-4 text-red-600 dark:text-red-400' />
                                <span className='text-sm font-medium text-red-800 dark:text-red-200'>
                                  Copy failed
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <ScrollArea.Root className='relative flex-1 overflow-hidden'>
                      <ScrollArea.Viewport className='h-full w-full overflow-auto'>
                        <ThemedSyntaxHighlighter source={activeSource} />
                      </ScrollArea.Viewport>
                      <div className='absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-muted via-muted/80 to-transparent pointer-events-none z-20' />
                      <ScrollArea.Scrollbar
                        orientation='vertical'
                        className='flex w-2 touch-none select-none bg-transparent p-0.5'
                      >
                        <ScrollArea.Thumb className='relative flex-1 rounded-full bg-border hover:bg-border/80' />
                      </ScrollArea.Scrollbar>
                      <ScrollArea.Scrollbar
                        orientation='horizontal'
                        className='hidden'
                      >
                        <ScrollArea.Thumb className='relative flex-1 rounded-full bg-border hover:bg-border/80' />
                      </ScrollArea.Scrollbar>
                    </ScrollArea.Root>
                  </div>
                </div>
              )}
            </Tabs.Content>
          </div>
        </div>
      </Tabs.Root>
    </div>
  );
}
