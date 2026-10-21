import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { posts } from '@data/posts';
import { PostNav } from './PostNav';

const meta = {
  title: 'Components/PostNav',
  component: PostNav,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: 800 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PostNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Both: Story = {
  args: { previous: posts[2], next: posts[0] },
};

export const OnlyPrevious: Story = {
  args: { previous: posts[1] },
};
