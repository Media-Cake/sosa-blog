import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { posts } from '@data/posts';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: 320 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithRelated: Story = {
  args: { relatedPosts: posts.slice(0, 6) },
};

export const WithoutRelated: Story = {
  args: { relatedPosts: [] },
};
