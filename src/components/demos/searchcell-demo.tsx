import { SearchCell } from '@/components/ui/search-cell';

export default function SearchCellDemo() {
  return (
    <SearchCell
      className='w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800'
      typeSpeed={65}
      pauseDuration={3000}
      label='Searching...'
      queries={[
        {
          query: 'onboarding docs for new hires',
          results: [
            {
              path: 'HR / Docs',
              title: 'New hire onboarding guide',
              highlight: 'onboarding',
            },
            {
              path: 'HR / Templates',
              title: 'First week checklist',
              highlight: 'docs',
            },
          ],
        },
        {
          query: 'How do I request time off',
          results: [
            {
              path: 'Policies / Leave',
              title: 'Time off request process',
              highlight: 'time off',
            },
          ],
        },
      ]}
    />
  );
}
