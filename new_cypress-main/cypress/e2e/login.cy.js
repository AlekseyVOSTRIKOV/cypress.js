import* as data from "../helpers/default_data.json" 
import* as main_page from "../locators/main_page.json"
import* as result_page from "../locators/result_page.json"
import* as recovery_page from "../locators/recovery_password_page.json"


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
          cy.visit('/');
          cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
            });
 
    afterEach('Конец теста', function () {
     cy.get(result_page.close).should('be.visible');
 
         });
 
    it('Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_Button).click();
         cy.get(result_page.title).contains('Авторизация прошла успешно');
         cy.get(result_page.title).should('be.visible');
         
     })
 
       it('Верный логин и неверный пароль', function () {
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type('iLoveqastudio2');
         cy.get(main_page.login_Button).click();
         cy.get(result_page.title).should('be.visible');
         cy.get(result_page.title).contains('Такого логина или пароля нет');
     })
       it('Валидация на наличие @', function () {
         cy.get(main_page.email).type('germandolnikov.ru');
         cy.get(main_page.password).type('iLoveqastudio');
         cy.get(main_page.login_Button).click();
         cy.get(result_page.title).contains('Нужно исправить проблему валидации');
        cy.get(result_page.title).should('be.visible');
      })
        it('Восстановление пароля', function () {
         cy.get(main_page.forgot_pass_btn).click();
         cy.get(recovery_page.email).type(data.login);
         cy.get(recovery_page.send_button).click();
         cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
         cy.get(result_page.title).should('be.visible');
      })

        it('проверка к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввели логин без @
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_Button).click(); // нажали кнопку войти
        cy.get(result_page.title).should('be.visible'); //текст виден пользователю
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю что после авторизации получен текст
      })
    })