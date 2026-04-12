import { Zap } from 'lucide-react';
import Widget, { WidgetProps } from '../widget';
import QuickActionsBody from './quick-actions-body';

function QuickActions({ ...rest }: WidgetProps) {
  return (
    <Widget {...rest}>
      <Widget.Header>
        <Widget.Title>
          <Zap size={18} /> Quick Actions
        </Widget.Title>
      </Widget.Header>
      <Widget.Content>
        <QuickActionsBody />
      </Widget.Content>
    </Widget>
  );
}

export default QuickActions;
