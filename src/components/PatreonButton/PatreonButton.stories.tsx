import type { Meta, StoryObj } from '@storybook/react-vite';
import { PatreonButton } from './PatreonButton';

const meta = {
  title: 'Components/PatreonButton',
  component: PatreonButton,
} satisfies Meta<typeof PatreonButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
