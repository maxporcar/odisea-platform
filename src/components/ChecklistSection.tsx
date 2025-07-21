import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  order_index: number;
}

interface ChecklistProgress {
  item_id: string;
  completed: boolean;
}

interface ChecklistSectionProps {
  title: string;
  description?: string;
  items: ChecklistItem[];
  progress: ChecklistProgress[];
  onToggleItem: (itemId: string) => void;
}

export const ChecklistSection = ({
  title,
  description,
  items,
  progress,
  onToggleItem,
}: ChecklistSectionProps) => {
  const completedCount = items.filter(item => 
    progress.find(p => p.item_id === item.id)?.completed
  ).length;
  const totalCount = items.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const isItemCompleted = (itemId: string) => {
    return progress.find(p => p.item_id === itemId)?.completed || false;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          <div className="text-right text-sm text-muted-foreground ml-4">
            {completedCount}/{totalCount} completed
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {Math.round(progressPercentage)}% complete
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-card">
            <Checkbox
              id={item.id}
              checked={isItemCompleted(item.id)}
              onCheckedChange={() => onToggleItem(item.id)}
              className="mt-0.5"
            />
            <div className="flex-1 space-y-1">
              <label
                htmlFor={item.id}
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer ${
                  isItemCompleted(item.id) ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {item.title}
              </label>
              {item.description && (
                <p className={`text-xs text-muted-foreground ${
                  isItemCompleted(item.id) ? 'line-through' : ''
                }`}>
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};