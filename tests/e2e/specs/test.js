// main variables
const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
let email = '';
for(var i=0; i<15; i++){
    email += chars[Math.floor(Math.random() * chars.length)];
}
email += '@cypress-test.com'
const password = 'cypress'

describe('Signin & Login', () => {
  it('Check if the user is not connected (redirection to /)', () => {
    cy.visit('http://localhost:8080/app')
    cy.contains('h3', 'Inscription et connexion')
  })

  it('Signin', () => {
    cy.get('#home-choise-signIn').click();
    cy.contains('h3', 'Inscription')
    cy.get('#email1').type(email)
    cy.get('#email2').type(email)
    cy.get('#pwd1').type(password)
    cy.get('#pwd2').type(password)
    cy.get('.btn.btn-contact-manager.btn-block').click()
    cy.contains('Merci pour votre Inscription. Vous pouvez maintenant vous connecter.')
  });

  it('Back to home page', () => {
    cy.get('.home-form-back').click();
    cy.contains('h3', 'Inscription et connexion')
  });

  it('Login', () => {
    cy.get('#home-choise-logIn').click()
    cy.contains('h3', 'Connexion')
    cy.get('input[type=email]').type(email)
    cy.get('input[type=password]').type(password)
    cy.get('button[type=submit]').click()
  })
})
describe('App with one contact', () => {
  it('Login', () => {
    cy.visit('http://localhost:8080/app')
    cy.get('#home-choise-logIn').click()
    cy.contains('h3', 'Connexion')
    cy.get('input[type=email]').type(email)
    cy.get('input[type=password]').type(password)
    cy.get('button[type=submit]').click()
    
    cy.contains('button', 'Ajouter un contact')
  })

  it('Add contact', () => {
    cy.contains('button', 'Ajouter un contact').click()
    cy.get('input[placeholder="Prénom"]').type('John')
    cy.get('#add-btn').click()
    cy.get('.contact-wrapper').should('have.length', 1)
  })

  it('Modify contact modal open and close', () => {
    cy.get('.btn-contact-edit').click()
    cy.contains('button', 'Valider les modifications')
    cy.get('button.close.btn-close-modify').click()
    cy.contains('button', 'Valider les modifications').not()
  })

  it('Modify contact', () => {
    cy.get('.btn-contact-edit').click()
    cy.get('input[placeholder="Nom"]').type('Doe')
    cy.contains('button', 'Valider les modifications').click()
    cy.contains('#success-msg', 'John a été modifié')
    cy.contains('button', 'Valider les modifications').not()
  })

  it('Delete contact', () => {
    cy.get('button.btn-delete').click()
    cy.contains('button', 'Oui').click()
    cy.get('.contact-wrapper').should('have.length', 0)
  })

  it('Log out', () => {
    cy.contains('span', 'Déconnexion').click()
    cy.url().should('eq', 'http://localhost:8080/')
  })
})

describe('Multiple contacts', () => {
  it('Login', () => {
    cy.visit('http://localhost:8080/app')
    cy.get('#home-choise-logIn').click()
    cy.contains('h3', 'Connexion')
    cy.get('input[type=email]').type(email)
    cy.get('input[type=password]').type(password)
    cy.get('button[type=submit]').click()
    
    cy.contains('button', 'Ajouter un contact')
  })

  it('Create 3 contacts', () => {
    cy.contains('button', 'Ajouter un contact').click()
    cy.get('input[placeholder="Prénom"]').type('Alex')
    cy.get('#add-btn').click()

    cy.contains('button', 'Ajouter un contact').click()
    cy.get('input[placeholder="Prénom"]').first().type('Alexandre')
    cy.get('#add-btn').click()

    cy.wait(500)
    cy.contains('button', 'Ajouter un contact').click()
    cy.get('input[placeholder="Prénom"]').first().type('Eva')
    cy.get('#add-btn').click()

    cy.get('.contact-wrapper').should('have.length', 3)
  })

  it('Search for John', () => {
    cy.get('input[placeholder="Rechercher un contract"]').type('John')
    cy.get('.contact-wrapper').should('have.length', 0)
  })

  it('Search for Alex', () => {
    cy.get('input[placeholder="Rechercher un contract"]').clear()
    cy.get('input[placeholder="Rechercher un contract"]').type('Alex')
    // cypress going to fast for the API
    cy.wait(750)
    cy.get('.contact-wrapper').should('have.length', 2)
  })
})
