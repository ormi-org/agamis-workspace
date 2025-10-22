import type { Meta, StoryObj } from '@storybook/angular';
import { ResetPageComponent } from './reset-page.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ResetPageComponent> = {
  component: ResetPageComponent,
  title: 'ResetPageComponent',
};
export default meta;
type Story = StoryObj<ResetPageComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/reset-page works!/gi)).toBeTruthy();
  },
};
