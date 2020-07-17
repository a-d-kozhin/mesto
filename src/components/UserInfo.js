// класс, реализующий функционал редактирования профиля
export class UserInfo {
  constructor(profileName, profileJob) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }

  // публичный метод для заполнения инпутов в соответствии с данными в профиле
  getUserInfo() {
    this._profileData = {};
    this._profileData.name = this._profileName.textContent;
    this._profileData.job = this._profileJob.textContent;
    return this._profileData;
  }

  // публичный метод для замены данных в профиле на основании инпутов
  setUserInfo(obj) {
    this._profileName.textContent = obj.name;
    this._profileJob.textContent = obj.job;
  }
}