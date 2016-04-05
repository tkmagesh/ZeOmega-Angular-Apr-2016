describe("greet module", function(){
	
	beforeEach(module("myApp.greet"));

	describe("greet controller", function(){

		it("Should initialize the name as empty string", inject(function($controller){

			var dummyScope = {};

			$controller("greetController", {$scope : dummyScope});

			expect(dummyScope.name).toBe('');
		}));

		it("Should initialize the message as empty string", inject(function($controller){

			var dummyScope = {};

			$controller("greetController", {$scope : dummyScope});

			expect(dummyScope.message).toBe('');
		}));

		it("Should populate the message when greeted", inject(function($controller){

			//Arrange
			var dummyScope = {},
				name = 'Magesh',
				expectedMessage = 'Hi Magesh, Have a nice day!';

			$controller("greetController", {$scope : dummyScope});

			//Act
			dummyScope.name = name;
			dummyScope.greet();

			//Assert
			expect(dummyScope.message).toBe(expectedMessage);
		}));


	});

	describe("trimText filter", function(){
		it("Should return the given string if short", inject(function($filter){

			//Arrange
				var input = 'short string',
					expectedOutput = input,
					trimTextFilter = $filter('trimText');

			//Act
				var actualOutput = trimTextFilter(input);

			//Assert
				expect(actualOutput).toBe(expectedOutput);

		}));

		it("Should return the truncated string if long", inject(function($filter){

			//Arrange
				var input = 'This is a very very looooong string for testing purpose',
					expectedOutput = 'This is a very very ' + '...',
					trimTextFilter = $filter('trimText');

			//Act
				var actualOutput = trimTextFilter(input);

			//Assert
				expect(actualOutput).toBe(expectedOutput);

		}));
	})
});