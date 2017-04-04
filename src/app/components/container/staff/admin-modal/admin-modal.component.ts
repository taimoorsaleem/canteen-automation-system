import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Staff } from '../../../../models/staff.model';
import { AccountService } from '../../../../services/account-service';
import { StaffService } from '../../../../services/staff-service';
@Component({
    selector: 'admin-modal',
    templateUrl: 'admin-modal.component.html'
})

export class AdminModalComponent {
    constructor(private accountService: AccountService) {
        console.log(this.selectedAdmin);
    }

    ////////INPUT////////

    @Input() selectedAdmin: Staff;
    @Input() staffService: StaffService;

    ////////EVENTS////////

    ngOnInit() {
        console.log("this.");
        console.log(this.selectedAdmin);
    }

    ////////BUTTONS////////


    clickConfirm() {
        if ('$key' in this.selectedAdmin) {
            let key = this.selectedAdmin.$key;
            delete this.selectedAdmin.$key
            this.staffService.editAdmin(key, this.selectedAdmin).then((success) => {

            }).catch((error) => {
                console.log(error);
            });
        }
        else {
            this.accountService.createUser(this.selectedAdmin.email, "u123456", this.selectedAdmin.name).then((success) => {
                this.staffService.addAdmin(this.selectedAdmin).then((success) => {

                }).catch((error) => {
                console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
        }

        //console.log(this.selectedAdmin.$key);

    }
}