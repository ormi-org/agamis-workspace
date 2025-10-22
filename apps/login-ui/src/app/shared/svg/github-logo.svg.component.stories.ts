import type { Meta, StoryObj } from '@storybook/angular';
import { GithubLogoSvgComponent } from './github-logo.svg.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Color } from '@agamis/workspace/shared/common/types';

const meta: Meta<GithubLogoSvgComponent> = {
  component: GithubLogoSvgComponent,
  title: 'GithubLogoSvgComponent',
};
export default meta;
type Story = StoryObj<GithubLogoSvgComponent>;

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
    expect(canvas.getByText(/github-logo.svg works!/gi)).toBeTruthy();
  },
};
