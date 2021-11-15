import { getAllCategories, getMyCategories } from '../actions/categories';

const categories = async () => {
  let categories = await getAllCategories();
  if (categories) {
    let category = categories[0];
    let categoryObject = {
      negativeAction: category.negativeAction,
      negativeEmotions: category.negativeEmotions,
      neutralAction: category.neutralAction,
      neutralEmotions: category.neutralEmotions,
      positiveAction: category.positiveAction,
      positiveEmotions: category.positiveEmotions,
      positivePhysical: category.positivePhysical,
      negativePhysical: category.negativePhysical,
      neutralPhysical: category.neutralPhysical
    }
    return categoryObject;
  }

}

const userCategories = async () => {
  let userCategories = await getMyCategories();
  if (userCategories.length > 0) {
    let userCategory = userCategories[0];
    let userCategoryObject = {
      negativeAction: userCategory.negativeAction,
      negativeEmotions: userCategory.negativeEmotions,
      neutralAction: userCategory.neutralAction,
      neutralEmotions: userCategory.neutralEmotions,
      positiveAction: userCategory.positiveAction,
      positiveEmotions: userCategory.positiveEmotions,
      positivePhysical: userCategory.positivePhysical,
      negativePhysical: userCategory.negativePhysical,
      neutralPhysical: userCategory.neutralPhysical
    }
    return userCategoryObject;
  }
}

export const typeAndDirection = (title, typeDirectionData) => {
  for (let i=0; typeDirectionData.length>i; i++) {
    for (const property in typeDirectionData[i]) {
      if (typeDirectionData[i][property]){
        if (typeDirectionData[i][property].includes(title) === true) {
          return property
        }
      }
    }
  }
};

const titleSplit = (title, typeDirectionData) => {
  let allTypesReturned = '';
  let titleWhole = [];
  titleWhole.push(title);
  console.log(titleWhole);
  let titleSplit = title.split(' ');
  console.log(titleSplit);
  let titleAll = titleWhole.concat(titleSplit);
  console.log(titleAll.length);
  for (let i = 0; titleAll.length > i; i++) {
    let title = titleAll[i];
    console.log(title);
    console.log(i);
    let type = typeAndDirection(title, typeDirectionData);
    console.log(type);
    if (type) {
      allTypesReturned += type + ",";
      if (i === 0) return allTypesReturned;
  }}

  if (allTypesReturned) {
    return allTypesReturned;
  } else {
    return null;
  }
}

const determineTypeAndDirection = (title, typeDirectionData) => {
  let allTypesReturned = titleSplit(title, typeDirectionData);
  let typesAndDirectionReturned = {
    type: '',
    direction: ''
  }
  if (allTypesReturned) {
    console.log(allTypesReturned);
  if (allTypesReturned.includes('Emotions') === true && allTypesReturned.includes('Action') === true && allTypesReturned.includes('Physical') === false) typesAndDirectionReturned.type = 'Action & Emotion';
  if (allTypesReturned.includes('Emotions') === true && allTypesReturned.includes('Action') === true && allTypesReturned.includes('Physical') === true) typesAndDirectionReturned.type = 'Action & Emotion & Physical';
  if (allTypesReturned.includes('Emotions') === true && allTypesReturned.includes('Action') === false  && allTypesReturned.includes('Physical') === false) typesAndDirectionReturned.type = 'Emotions';
  if (allTypesReturned.includes('Emotions') === false && allTypesReturned.includes('Action') === true && allTypesReturned.includes('Physical') === false) typesAndDirectionReturned.type = 'Action';
  if (allTypesReturned.includes('Emotions') === false && allTypesReturned.includes('Action') === false && allTypesReturned.includes('Physical') === true) typesAndDirectionReturned.type = 'Physical';
  if (allTypesReturned.includes('Emotions') === false && allTypesReturned.includes('Action') === true && allTypesReturned.includes('Physical') === true) typesAndDirectionReturned.type = 'Action & Physical';
  if (allTypesReturned.includes('Emotions') === true && allTypesReturned.includes('Action') === false && allTypesReturned.includes('Physical') === true) typesAndDirectionReturned.type = 'Physical & Emotional';
  if (allTypesReturned.includes('positive') === true && allTypesReturned.includes('negative') === true) typesAndDirectionReturned.direction = 'positive & negative';
  if (allTypesReturned.includes('positive') === true && allTypesReturned.includes('negative') === false) typesAndDirectionReturned.direction = 'positive';
  if (allTypesReturned.includes('positive') === false && allTypesReturned.includes('negative') === true) typesAndDirectionReturned.direction = 'negative';
  if (allTypesReturned.includes('positive') === false && allTypesReturned.includes('negative') === false) typesAndDirectionReturned.direction = 'neutral';
} else {
    typesAndDirectionReturned.type = "No Type";
    typesAndDirectionReturned.direction = "No Direction";
}
  return typesAndDirectionReturned;
}

//Checks to see what is the type and direction on create and when an entry is edited
export const typeAndDirectionMain = async (titleSent) => {
  let title = titleSent.toLowerCase();
  //Get custom categories
  let typeDirectionDataCustom = await userCategories();
  //Get main categories
  let typeDirectionDataMain = await categories();
  //Pus categories into an array.
  let typeDirectionData = [];
  if (typeDirectionDataCustom) {
    typeDirectionData.push(typeDirectionDataCustom);
    typeDirectionData.push(typeDirectionDataMain);
  } else {
    typeDirectionData.push(typeDirectionDataMain);
  }

  console.log(typeDirectionData)

  let type = {};
  if (typeDirectionData){
    type = determineTypeAndDirection(title, typeDirectionData);
    console.log(type);
  }
        return type;
}

export const addOrEditTypeAndDirection = async (titleSent, direction, type ) => {
  let title = titleSent.toLowerCase();
  let types = [];
  switch (type) {
    case 'No Type':
      types = ['No Type'];
      break;
    case 'Emotions':
      types = ['Emotions'];
      break;
    case 'Physical':
      types = ['Physical'];
      break;
    case 'Action':
      types = ['Action'];
      break;
    default:
      types = ['Action'];
      console.error('Issue with dertmining types');
  }
  let directions = [];
  switch (direction) {
    case 'No Direction':
      directions = ['No Direction'];
      break;
    case 'positive':
      directions = ['positive'];
      break;
    case 'negative':
      directions = ['negative'];
      break;
      case 'neutral':
        directions = ['neutral'];
        break;
    default:
      directions = ['neutral'];
      console.error('Issue with dertmining direction');
  }

  let property = directions + types;
  let formData = {};

    formData = {
      ...formData,
      [property] : title
    };
  //Get users custom types and directions
  let typeDirectionDataCustom = await userCategories();
  let typeDirectionData = typeDirectionDataCustom;
  let typeDirectionDataArray = [];
  typeDirectionDataArray.push(typeDirectionDataCustom);
  let existingType = {};
  //check if user has unique tyCpes and direction
  if (typeDirectionData){
    existingType = determineTypeAndDirection(title, typeDirectionDataArray);
    //Check if existing titles exist in that property and add them together.
    let existingTitles = typeDirectionData[property];
    if (existingTitles) {
      if (existingTitles.includes(title) !== true) {
      let newTitles = existingTitles + ',' + formData[property];
      formData = {
        ...formData,
        [property] : newTitles
      }
    } else {
      return "No Change"
    }};
  }
  //check if the title matches one of the custom types or directions.
  if (existingType.type === 'No Type' || Object.keys(existingType).length === 0 || existingType.type.includes('&') || existingType.direction.includes('&') ) {
    console.log('No type or empty object or existing type and direction')
  }
  //Finding and removing existing custom type or direction
 else {
   let identifyExistingProperty = existingType.direction + existingType.type;
   console.log(identifyExistingProperty);
   if (identifyExistingProperty !== property) {
   let currentText = typeDirectionData[identifyExistingProperty];
   console.log(currentText);
   let removeText = currentText.replace(title, '');
   console.log(removeText);
   let removeCommas = removeText.replace(',,',',');
   let lastChar = removeCommas[removeCommas.length - 1];
   let finalText = '';
   if (removeCommas.charAt(0) === ',') {
     finalText = removeCommas.substring(1);
   } else if (lastChar === ',') {
     finalText = removeCommas.slice(0, -1);
   } else {
     finalText = removeCommas;
   }
   formData = {
     ...formData,
     [identifyExistingProperty]:finalText
   }}
}
return formData;

}
