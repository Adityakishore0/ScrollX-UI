import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ComponentPreview from '@/components/Component-preview';
import { ComponentSource } from '@/components/component-source';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PkgOptions from '@/components/pkgoptions';
import DepsOptions from '@/components/depsoptions';
import { Step } from '@/components/Step';
import { Steps } from '@/components/ui/Steps';
import { PropsTable } from '@/components/propstable';
import { MDXPropsTable } from '@/components/mdx/propstable-wrapper';
import BlocksPreview from '@/components/blockspreview';
import BlockTabs from '@/components/blocktabs';
import { Badge } from '@/components/ui/badge';
import { FileIcon } from '@/components/file-icon';

export const mdxComponents = {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Badge,
  BlockTabs,
  BlocksPreview,
  ComponentPreview,
  ComponentSource,
  FileIcon,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  PkgOptions,
  DepsOptions,
  Step,
  Steps,
  PropsTable,
  table: MDXPropsTable,
};
