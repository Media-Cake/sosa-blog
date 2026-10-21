import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeaturedImage } from './FeaturedImage';

const meta = {
  title: 'Components/FeaturedImage',
  component: FeaturedImage,
  decorators: [
    (Story) => (
      <div style={{ width: 800 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeaturedImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    title: 'A SoSa Retrospective',
    image: '/wp-content/uploads/2020/12/image-23.png',
  },
};

export const Placeholder: Story = {
  args: { title: 'Contact Us' },
};

export const NotFound: Story = {
  args: {
    title: "The princess you're looking for is in another castle",
    variant: 'notFound',
  },
};
