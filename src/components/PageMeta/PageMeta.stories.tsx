import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageMeta } from './PageMeta';

const meta = {
  title: 'Components/PageMeta',
  component: PageMeta,
} satisfies Meta<typeof PageMeta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: { path: '/' },
};

export const Article: Story = {
  args: {
    path: '/a-sosa-retrospective/',
    title: 'A SoSa Retrospective',
    description: 'Hello, is it me you’re looking for?',
    image: '/wp-content/uploads/2020/12/image-23.png',
    type: 'article',
  },
};
