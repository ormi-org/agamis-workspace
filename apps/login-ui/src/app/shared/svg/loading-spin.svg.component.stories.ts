import type { Meta, StoryObj } from '@storybook/angular';
import { LoadingSpinSvgComponent } from './loading-spin.svg.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Color } from '@agamis/workspace/shared/common/types';

const meta: Meta<LoadingSpinSvgComponent> = {
  component: LoadingSpinSvgComponent,
  title: 'LoadingSpinSvgComponent',
};
export default meta;
type Story = StoryObj<LoadingSpinSvgComponent>;

export const Primary: Story = {
  args: {
    fillColor: Color.PRIMARY_ONE,
  },
};

export const Heading: Story = {
  args: {
    fillColor: Color.PRIMARY_ONE,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/loading-spin.svg works!/gi)).toBeTruthy();
  },
};
