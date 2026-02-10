'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';

export function ThemedSyntaxHighlighter({
  source,
  fileName,
}: {
  source: string;
  fileName?: string;
}) {
  const { resolvedTheme } = useTheme();

  const tsIconSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M19.131 3H4.869c-.955 0-1.73.787-1.73 1.758v14.484c0 .97.775 1.758 1.73 1.758h14.262c.956 0 1.73-.787 1.73-1.758V4.758c0-.97-.774-1.758-1.73-1.758m-5.712 9.984h-2.215v6.434H9.439v-6.434H7.223v-1.441h6.196zm5.712 5.277c-.139.317-.377.552-.658.739a3 3 0 0 1-.969.386a5.6 5.6 0 0 1-1.177.12a6.5 6.5 0 0 1-1.211-.11a3.7 3.7 0 0 1-1.004-.33v-1.689l-.066-.053l.066-.015v.068q.441.357.972.545c.347.133.727.2 1.108.2c.242 0 .426-.021.589-.06a1.4 1.4 0 0 0 .415-.168a.7.7 0 0 0 .246-.253a.7.7 0 0 0-.052-.738a1.3 1.3 0 0 0-.346-.335a3 3 0 0 0-.52-.295c-.207-.095-.418-.194-.657-.292c-.589-.281-1.053-.562-1.35-.95c-.301-.35-.45-.808-.45-1.335c0-.422.08-.76.242-1.055c.173-.316.377-.548.658-.738c.277-.193.588-.334.969-.422c.38-.088.762-.133 1.177-.133s.762.024 1.073.073c.311.05.602.127.865.229v1.652a2.3 2.3 0 0 0-.415-.242a3.8 3.8 0 0 0-.97-.275a3 3 0 0 0-.45-.033a2.4 2.4 0 0 0-.553.057a1.3 1.3 0 0 0-.416.161a.8.8 0 0 0-.26.25a.6.6 0 0 0-.093.327q0 .194.104.351q.103.152.295.296c.114.091.27.183.45.274c.207.091.394.183.623.278c.311.133.588.281.83.422c.243.14.447.305.623.492c.187.175.322.387.416.633s.142.523.142.843c0 .457-.108.809-.246 1.125'/%3E%3C/svg%3E")`;

  const customTheme = resolvedTheme === 'dark' ? vscDarkPlus : oneLight;

  const themeWithoutBg = {
    ...customTheme,
    'pre[class*="language-"]': {
      ...customTheme['pre[class*="language-"]'],
      background: 'transparent',
    },
  };

  return (
    <>
      {fileName && (
        <div className='flex items-center gap-2 px-4 py-2.5 bg-muted rounded-t-lg'>
          <span
            className='inline-block w-5 h-5 bg-foreground shrink-0'
            style={{
              WebkitMask: `${tsIconSvg} no-repeat center / contain`,
              mask: `${tsIconSvg} no-repeat center / contain`,
            }}
          />
          <span className='font-mono text-sm text-foreground/90'>
            components/ui/{fileName}.tsx
          </span>
        </div>
      )}
      <div className='bg-muted rounded-b-lg'>
        <SyntaxHighlighter
          language='tsx'
          style={themeWithoutBg}
          customStyle={{
            fontSize: '13px',
            borderRadius: '0',
            padding: '1rem',
            width: '100%',
            height: '100%',
            margin: 0,
            background: 'transparent',
          }}
          wrapLines={true}
          wrapLongLines={true}
          className='h-full w-full [&_code]:text-sm [&_pre]:text-sm'
        >
          {source}
        </SyntaxHighlighter>
      </div>
    </>
  );
}
