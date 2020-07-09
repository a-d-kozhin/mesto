import {profileName, profileJob, nameInput, jobInput} from '../utils/constants.js';

// класс, реализующий функционал редактирования профиля
export class UserInfo {
  constructor(profileName, profileJob) {
    this._nameInput = nameInput;
    this._jobInput = jobInput;
    this._profileName = profileName;
    this._profileJob = profileJob;
  }

  // публичный метод для заполнения инпутов в соответствии с данными в профиле
  getUserInfo() {
    this._nameInput.value = profileName.textContent;
    this._jobInput.value = profileJob.textContent;
  }

  // публичный метод для замены данных в профиле на основании инпутов
  setUserInfo() {
    profileName.textContent = this._nameInput.value.trim();
    profileJob.textContent = this._jobInput.value.trim();
  }
}