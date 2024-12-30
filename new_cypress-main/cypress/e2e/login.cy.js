import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {

   beforeEach('Начало теста', function () {
         cy.visit('/'); // Зашел на сайт
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
           }); // Проверил цвет кнопки

   afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); // Наличие крестика
        });

   it('Верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login); // Ввел верный логин
        cy.get(main_page.password).type(data.password); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).should('be.visible'); // Текст виден
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Текст совпадает
    })

    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввел верный логин
        cy.get(main_page.password).type('iLoveqastudio7'); // Ввел неверный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).should('be.visible'); // Текст виден
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Текст совпадает
    })

    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('germann@dolnikov.ru'); // Ввел неверный логин
        cy.get(main_page.password).type(data.password); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).should('be.visible'); // Текст виден
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Текст совпадает
    })

    it('Валидация приведения строчных букв в логине', function () {
        cy.get(main_page.email).type('GerMan@DolnikoV.ru'); // Ввел верный логин
        cy.get(main_page.password).type(data.password); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).should('be.visible'); // Текст виден
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Текст совпадает
    })

    it('Валидация на наличие @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввел логин без @
        cy.get(main_page.password).type(data.password); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).should('be.visible'); // Текст виден
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Текст совпадает
    })

    it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нажал Забыли пароль
        cy.get(recovery_password_page.email).type(data.login); // Ввел почту
        cy.get(recovery_password_page.send_button).click(); // Нажал Отправить код
        cy.get(result_page.title).should('be.visible'); // Текст виден
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Текст совпадает
    })
})