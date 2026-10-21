import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignupForm } from './SignupForm';

const meta = {
  title: 'Components/SignupForm',
  component: SignupForm,
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SignupForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
