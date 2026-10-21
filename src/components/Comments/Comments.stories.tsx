import type { Meta, StoryObj } from '@storybook/react-vite';
import { Comments } from './Comments';

const meta = {
  title: 'Components/Comments',
  component: Comments,
  decorators: [
    (Story) => (
      <div style={{ width: 800 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Comments>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { identifier: '1905' },
};
