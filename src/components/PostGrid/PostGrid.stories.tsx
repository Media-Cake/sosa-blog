import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { posts } from '@data/posts';
import { PostGrid } from './PostGrid';

const meta = {
  title: 'Components/PostGrid',
  component: PostGrid,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="container-fluid">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof PostGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: { posts, basePath: '/', page: 1 },
};

export const Empty: Story = {
  args: { posts: [], basePath: '/', page: 1 },
};
