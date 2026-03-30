import { ChecklistCell } from '@/components/ui/checklist-cell';

export default function ChecklistCellDemo() {
  return (
    <ChecklistCell
      className='w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800'
      initialCompleted={3}
      finalCompleted={6}
      stepInterval={700}
      tasks={[
        'How it all started',
        'Our values and approach',
        'Working together',
        'Union rules and integration',
        'Team structure',
        'Communication norms',
        'Feedback culture',
        'Onboarding wrap-up',
      ]}
    />
  );
}
