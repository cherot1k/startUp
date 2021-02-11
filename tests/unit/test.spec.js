
const {search,reverseArr,sortByName} = require('../../components/func')

describe('Tests', ()=>{
   it("reverse",()=>{
     expect(reverseArr(['1','2','3'])).toStrictEqual(['3','2','1'])
   })
    it('sort', function () {
      expect(sortByName(['Kostya','Andrew','Zorro'])).toStrictEqual(['Andrew','Kostya','Zorro'])
    });
    it('search', function () {
      expect(search(['SomeBody','Apple','Uber'],'a')).toStrictEqual(['Apple'])
    });
  }
) 

