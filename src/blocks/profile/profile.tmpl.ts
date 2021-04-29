const source = `<div class="profile-page">
        <div class="profile-back-to-chats-block">
            <button class="profile-back-to-chats-button">
                <a class="profile-back-to-chats-link" href="/chats">
                    <img src="../../assets/icons/arrow-left.svg" alt="Назад">
                </a>
            </button>
        </div>
        <div class="profile-container">
            <div class="head-info">
                <div class="profile-change-picture">
                    <a class="profile-change-picture-link" href="">
                        <div class="user-picture">
                            <img class="user-picture-default-icon" src="../../assets/icons/profile-picture.svg" alt="Фото">
                        </div>
                        <div class="change-picture">
                            <span>Поменять аватар</span>
                        </div>
                    </a>
                </div>
                <div class="user-nickname">Иван</div>
            </div>
            <ul class="user-info">
                <li class="user-info-item profile-password">
                    <div class="info-item-label">Почта</div>
                    <div class="info-item-data">pochta@yandex.ru</div>
                </li>
                <li class="user-info-item profile-login">
                    <div class="info-item-label">Логин</div>
                    <div class="info-item-data">ivanivanov</div>
                </li>
                <li class="user-info-item profile-name">
                    <div class="info-item-label">Имя</div>
                    <div class="info-item-data">Иван</div>
                </li>
                <li class="user-info-item profile-last-name">
                    <div class="info-item-label">Фамилия</div>
                    <div class="info-item-data">Иванов</div>
                </li>
                <li class="user-info-item profile-nickname">
                    <div class="info-item-label">Имя в чате</div>
                    <div class="info-item-data">Иван</div>
                </li>
                <li class="user-info-item profile-phone">
                    <div class="info-item-label">Телефон</div>
                    <div class="info-item-data">+7 (909) 967 30 30</div>
                </li>
            </ul>
            <ul class="profile-actions">
                <li class="profile-actions-item"><a class="change-info-link basic-link" href="/change_profile_info">Изменить данные</a></li>
                <li class="profile-actions-item"><a class="change-password-link basic-link" href="/change_password">Изменить пароль</a></li>
                <li class="profile-actions-item"><a class="quit-link" href="/">Выйти</a></li>
            </ul>
        </div>
    </div>`;

export const template = Handlebars.compile(source);