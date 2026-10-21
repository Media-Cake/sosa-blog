import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: 800 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: { basePath: '/', current: 1, total: 15 },
};

export const MiddlePage: Story = {
  args: { basePath: '/', current: 8, total: 15 },
};

export const SinglePage: Story = {
  args: { basePath: '/tag/sosa/', current: 1, total: 1 },
};
