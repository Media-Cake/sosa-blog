import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { posts } from '@data/posts';
import { RelatedPosts } from './RelatedPosts';

const meta = {
  title: 'Components/RelatedPosts',
  component: RelatedPosts,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: 320 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof RelatedPosts>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SixPosts: Story = {
  args: { posts: posts.slice(0, 6) },
};

export const Empty: Story = {
  args: { posts: [] },
};
