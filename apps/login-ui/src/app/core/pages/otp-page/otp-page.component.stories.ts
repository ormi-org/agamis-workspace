import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { OtpPageComponent } from './otp-page.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';

const meta: Meta<OtpPageComponent> = {
  component: OtpPageComponent,
  title: 'OtpPageComponent',
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule,],
      providers: [AuthenticationService],
    })
  ]
};
export default meta;
type Story = StoryObj<OtpPageComponent>;

export const Primary: Story = {
  args: {}
};
