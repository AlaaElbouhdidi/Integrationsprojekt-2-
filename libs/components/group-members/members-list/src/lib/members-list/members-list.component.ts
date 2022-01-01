import { Component, OnInit } from '@angular/core';
import { Member } from '@api-interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, AuthService, GroupService } from '@services';

@Component({
  selector: 'mate-team-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {

  gid = 'JaTpoZk1eD6kD7XWdwAk';
  membersList: Member[] ;
    /**
     * Modal reference
     */
 modalRef: NgbModalRef | undefined;
    /**
     * Reference for the confirmation modal
     */
  confirmationModalRef: NgbModalRef | undefined;


  constructor(
    private groupService: GroupService,
    private modalService: NgbModal,
    private authService: AuthService,
    private alertService: AlertService
  ) { 
    this.membersList = [];
  }

  async ngOnInit(): Promise<void> {
    try{
       await this.groupService.getAllMembers(this.gid).subscribe(items => {
         this.membersList = items;
             }
        );
        
           }
       catch (err: any) {
         this.alertService.addAlert({
             type: 'error',
             message: err.message,
         });
         console.error(err.message);
     }
  }
  deleteMember(m: Member){
    this.groupService.deleteMember(this.gid, m);
    this.alertService.addAlert({
      type: 'success',
      message: 'Member successfully deleted'
  });
  }
  toggleIsAdmin(m: Member){
    this.groupService.toggleIsAdmin(this.gid, m);
    this.alertService.addAlert({
      type: 'success',
      message: 'Member updated'
  });
  }
  /**
     * Opens a modal where the user can add members 
     *
     * @param content {unknown} The modal reference
     */
  openModal(content: unknown){
    this.modalRef = this.modalService.open(content, { windowClass: 'dark-modal' });
  }
  /**
     * Closes a modal
     */
   closeModal(): void {
    this.modalRef?.dismiss();
  }
  /**
   * Opens the confirmation modal
   *
   * @param content {unknown} The modal to open
   * @returns {Promise<boolean>} A promise containing true if modal is closed and false if modal is dismissed
   */
  async openConfirmationModal(content: unknown): Promise<boolean> {
    this.confirmationModalRef = this.modalService.open(content, { windowClass: 'dark-modal' });
    try {
        await this.confirmationModalRef.result;
        return true;
    } catch {
        return false;
    }
  }

  /**
   * Dismiss the confirmation modal
   */
  dismissConfirmationModal(): void {
      this.confirmationModalRef?.dismiss();
  }

  /**
   * Close the confirmation modal
   *
   * @param ind {boolean} Indicates if action was confirmed
   */
  closeConfirmationModal(ind: boolean): void {
      this.confirmationModalRef?.close(ind);
  }



}