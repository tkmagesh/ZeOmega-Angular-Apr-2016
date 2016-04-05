'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });

  describe('greet', function() {

    beforeEach(function() {
      browser.get('index.html#/greet');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] h3')).first().getText()).
        toMatch(/Greeting App/);
    });

    it('should display the message when greeted', function(){
      //Arrange
        var txtName = element(by.model("name")),
            btnGreet = element(by.buttonText("Greet")),
            divMessage = element(by.binding("message")),
            name = 'Magesh',
            expectedMessage = 'Hi Magesh, Have a nice day!';

      //Act
        txtName.sendKeys(name);
        btnGreet.click();
        var actualMessage = divMessage.getText();

      //Assert
        expect(actualMessage).toBe(expectedMessage);
    })

  });
});
