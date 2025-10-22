import type { Meta, StoryObj } from '@storybook/angular';
import { OpenedEyeSvgComponent } from './opened-eye.svg.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Color } from '@agamis/workspace/shared/common/types';

const meta: Meta<OpenedEyeSvgComponent> = {
  component: OpenedEyeSvgComponent,
  title: 'OpenedEyeSvgComponent',
};
export default meta;
type Story = StoryObj<OpenedEyeSvgComponent>;

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
    expect(canvas.getByText(/opened-eye.svg works!/gi)).toBeTruthy();
  },
};
