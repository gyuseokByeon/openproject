import {
  Component,
  Input,
  EventEmitter,
  Output,
  ElementRef,
} from '@angular/core';
import {I18nService} from "core-app/modules/common/i18n/i18n.service";
import {PrincipalType} from '../invite-user.component';
import {HalResource} from "core-app/modules/hal/resources/hal-resource";
import {ProjectResource} from "core-app/modules/hal/resources/project-resource";
import {ImageHelpers} from "core-app/helpers/images/path-helper";

@Component({
  selector: 'op-ium-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.sass'],
})
export class SuccessComponent {
  @Input() principal:HalResource;
  @Input() project:ProjectResource;
  @Input() type:PrincipalType;

  @Output() close = new EventEmitter<void>();

  success_image = ImageHelpers.imagePath('invite-user-modal/successful-invite.svg');

  public text = {
    title: () => this.I18n.t('js.invite_user_modal.success.title', {
      principal: this.principal.name,
    }),
    description: {
      user: () => this.I18n.t('js.invite_user_modal.success.description.user', { project: this.project?.name }),
      placeholder: () => this.I18n.t('js.invite_user_modal.success.description.placeholder', { project: this.project?.name }),
      group: () => this.I18n.t('js.invite_user_modal.success.description.group', { project: this.project?.name }),
    },
    nextButton: this.I18n.t('js.invite_user_modal.success.next_button'),
  };

  constructor(
    readonly I18n:I18nService,
    readonly elementRef:ElementRef,
  ) {}
}
