import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';

const EditProfileDialog = ({ isOpen, onOpenChange, editFormData, handleEditFormChange, handleEditSubmit }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-telegram-secondary-bg border-telegram-divider text-telegram-text">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-telegram-hint">Name</label>
            <Input id="name" name="name" value={editFormData.name} onChange={handleEditFormChange} className="col-span-3 telegram-input" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="bio" className="text-right text-telegram-hint">Bio</label>
            <Textarea id="bio" name="bio" value={editFormData.bio} onChange={handleEditFormChange} className="col-span-3 telegram-input" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="location" className="text-right text-telegram-hint">Location</label>
            <Input id="location" name="location" value={editFormData.location} onChange={handleEditFormChange} className="col-span-3 telegram-input" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="website" className="text-right text-telegram-hint">Website</label>
            <Input id="website" name="website" value={editFormData.website} onChange={handleEditFormChange} className="col-span-3 telegram-input" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
              <Button type="button" variant="outline" className="telegram-button-secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleEditSubmit} className="telegram-button">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;