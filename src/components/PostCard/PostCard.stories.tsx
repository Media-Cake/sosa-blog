import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { posts } from '@data/posts';
import { PostCard } from './PostCard';

const meta = {
  title: 'Components/PostCard',
  component: PostCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="row" style={{ width: 1200 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PostCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithThumbnail: Story = {
  args: { post: posts[0] },
};

export const WithoutThumbnail: Story = {
  args: { post: { ...posts[0], thumbnail: undefined } },
};
