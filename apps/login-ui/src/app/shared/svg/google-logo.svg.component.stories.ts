import type { Meta, StoryObj } from '@storybook/angular';
import { GoogleLogoSvgComponent } from './google-logo.svg.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Color } from '@agamis/workspace/shared/common/types';

const meta: Meta<GoogleLogoSvgComponent> = {
  component: GoogleLogoSvgComponent,
  title: 'GoogleLogoSvgComponent',
};
export default meta;
type Story = StoryObj<GoogleLogoSvgComponent>;

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
    expect(canvas.getByText(/google-logo.svg works!/gi)).toBeTruthy();
  },
};
