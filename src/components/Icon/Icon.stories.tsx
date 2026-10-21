import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: { name: 'home' },
};

export const Facebook: Story = {
  args: { name: 'facebook' },
};

export const Steam: Story = {
  args: { name: 'steam' },
};
