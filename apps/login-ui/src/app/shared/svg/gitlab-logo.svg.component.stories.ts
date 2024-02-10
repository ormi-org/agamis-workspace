import type { Meta, StoryObj } from '@storybook/angular';
import { GitlabLogoSvgComponent } from './gitlab-logo.svg.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Color } from '@agamis/workspace/shared/common/types';

const meta: Meta<GitlabLogoSvgComponent> = {
  component: GitlabLogoSvgComponent,
  title: 'GitlabLogoSvgComponent',
};
export default meta;
type Story = StoryObj<GitlabLogoSvgComponent>;

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
    expect(canvas.getByText(/gitlab-logo.svg works!/gi)).toBeTruthy();
  },
};
