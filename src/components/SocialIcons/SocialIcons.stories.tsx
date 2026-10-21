import type { Meta, StoryObj } from '@storybook/react-vite';
import { SocialIcons } from './SocialIcons';

const meta = {
  title: 'Components/SocialIcons',
  component: SocialIcons,
} satisfies Meta<typeof SocialIcons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sidebar: Story = {
  args: { variant: 'sidebar', heading: 'Follow us:' },
};

export const Contact: Story = {
  args: { variant: 'contact' },
};
