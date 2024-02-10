import type { Meta, StoryObj } from '@storybook/angular';
import { AppComponent } from './app.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { environment } from '../environments/environment';

const meta: Meta<AppComponent> = {
  component: AppComponent,
  title: 'AppComponent',
};
export default meta;
type Story = StoryObj<AppComponent>;

export const Primary: Story = {
  args: {
    passedCtx: {
      view: environment.defaultView,
      orgId: environment.defaultOrgId,
      orgName: environment.defaultOrgName,
    },
  },
};

export const Heading: Story = {
  args: {
    passedCtx: {
      view: environment.defaultView,
      orgId: environment.defaultOrgId,
      orgName: environment.defaultOrgName,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/app works!/gi)).toBeTruthy();
  },
};
