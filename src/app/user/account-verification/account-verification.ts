import {Component, inject} from '@angular/core';
import {GoodStuffFunctionsService} from '../../../services/GoodStuffFunctionsService';
import {ActivatedRoute, Router} from '@angular/router';
import type {AccountVerificationRequest} from '../../../models/user/AccountVerification';

@Component({
  selector: 'app-account-verification',
  template: ``,
  standalone: true
})
export class AccountVerification {
  private functionsService = inject(GoodStuffFunctionsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    // Read URL params
    const userEmail = this.route.snapshot.queryParamMap.get('userEmail');
    const key = this.route.snapshot.queryParamMap.get('key');

    if (!userEmail || !key) {
      console.error("Missing query params");
      return;
    }

    // Map into interface
    const payload: AccountVerificationRequest = {
      userEmail: userEmail,
      key: key
    };

    // Call API
    this.functionsService.accountVerification(payload).subscribe({
      next: (result) => {
        if (result) {
          this.router.navigate(['/user/sign-in'], {
            state: { message: 'Account activated! You can now sign-in.' }
          })
        } else {
          this.router.navigate(['/user/sign-in'], {
            state: { message: 'Sorry! Something went wrong.' }
          })
        }
      }
    });
  }
}
