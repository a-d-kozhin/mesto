import {profileName, profileJob, nameInput, jobInput} from '../utils/constants.js';

export class UserInfo {
  constructor(profileName, profileJob) {
    this._nameInput = nameInput;
    this._jobInput = jobInput;
    this._profileName = profileName;
    this._profileJob = profileJob;
  }

  getUserInfo() {
    this._nameInput.value = profileName.textContent;
    this._jobInput.value = profileJob.textContent;
  }

  setUserInfo() {
    profileName.textContent = this._nameInput.value.trim();
    profileJob.textContent = this._jobInput.value.trim();
  }
}