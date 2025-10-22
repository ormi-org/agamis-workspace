import type { Meta, StoryObj } from '@storybook/angular';
import { AgamisLogoSvgComponent } from './agamis-logo.svg.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Color } from '@agamis/workspace/shared/common/types';

const meta: Meta<AgamisLogoSvgComponent> = {
  component: AgamisLogoSvgComponent,
  title: 'AgamisLogoSvgComponent',
};
export default meta;
type Story = StoryObj<AgamisLogoSvgComponent>;

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
    expect(canvas.getByText(/agamis-logo.svg works!/gi)).toBeTruthy();
  },
};
