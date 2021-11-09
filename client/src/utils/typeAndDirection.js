import { getAllCategories, getMyCategories, newUserCategory, editMyUserCategories } from '../actions/categories';

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
    console.log(categoryObject);
    return categoryObject;
  }

}

const userCategories = async () => {
  let userCategories = await getMyCategories();
  console.log(userCategories);
  if (userCategories.length > 0) {
    console.log(userCategories);
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
    console.log(userCategoryObject);
    return userCategoryObject;
  }
}

export const typeAndDirection = (title, typeDirectionData) => {
    for (const property in typeDirectionData) {
      console.log(property);
      if (typeDirectionData[property].includes(title) === true) {
        return property
      }
    }
};

const titleSplit = (title, typeDirectionData) => {
  let allTypesReturned = '';
  let titleSplit = title.split(' ');
  titleSplit.forEach((title, i) => {
    console.log(title);
    let type = typeAndDirection(title, typeDirectionData);
    if (type) allTypesReturned += type + ","
  });
  console.log(allTypesReturned);
  if (allTypesReturned) return allTypesReturned;
}

const determineTypeAndDirection = (title, typeDirectionData) => {
  let allTypesReturned = titleSplit(title, typeDirectionData);
  let typesAndDirectionReturned = {
    type: '',
    direction: ''
  }
  if (allTypesReturned) {
  if (allTypesReturned.includes('Emotions') === true && allTypesReturned.includes('Action') === true && allTypesReturned.includes('Physical') === false) typesAndDirectionReturned.type = 'Action with Emotion';
  if (allTypesReturned.includes('Emotions') === true && allTypesReturned.includes('Action') === true && allTypesReturned.includes('Physical') === true) typesAndDirectionReturned.type = 'Action with Emotion & Physical';
  if (allTypesReturned.includes('Emotions') === true && allTypesReturned.includes('Action') === false  && allTypesReturned.includes('Physical') === false) typesAndDirectionReturned.type = 'Emotion';
  if (allTypesReturned.includes('Emotions') === false && allTypesReturned.includes('Action') === true && allTypesReturned.includes('Physical') === false) typesAndDirectionReturned.type = 'Action';
  if (allTypesReturned.includes('Emotions') === false && allTypesReturned.includes('Action') === false && allTypesReturned.includes('Physical') === true) typesAndDirectionReturned.type = 'Physical';
  if (allTypesReturned.includes('Emotions') === false && allTypesReturned.includes('Action') === true && allTypesReturned.includes('Physical') === true) typesAndDirectionReturned.type = 'Action with Physical';
    if (allTypesReturned.includes('Emotions') === true && allTypesReturned.includes('Action') === false && allTypesReturned.includes('Physical') === true) typesAndDirectionReturned.type = 'Physical & Emotional';
  if (allTypesReturned.includes('positive') === true && allTypesReturned.includes('negative') === true) typesAndDirectionReturned.direction = 'Positive & Negative';
  if (allTypesReturned.includes('positive') === true && allTypesReturned.includes('negative') === false) typesAndDirectionReturned.direction = 'positive';
  if (allTypesReturned.includes('positive') === false && allTypesReturned.includes('negative') === true) typesAndDirectionReturned.direction = 'negative';
  if (allTypesReturned.includes('positive') === false && allTypesReturned.includes('negative') === false) typesAndDirectionReturned.direction = 'neutral';
} else {
    typesAndDirectionReturned.type = "No Type";
    typesAndDirectionReturned.direction = "No Direction";
}
  return typesAndDirectionReturned;
}

export const typeAndDirectionMain = async (titleSent) => {
  let title = titleSent.toLowerCase();
  let typeDirectionData = await userCategories();
  let type = {};
  if (typeDirectionData){
    type = determineTypeAndDirection(title, typeDirectionData);
  }
  if (type.type === 'No Type' || Object.keys(type).length === 0) {
    let typeDirectionData = await categories();
      type = determineTypeAndDirection(title, typeDirectionData);
      if (type.type === 'No Type' ) {
        type.type = "Action";
        type.direction = "Neutral";
      }
  }
        return type;
}

export const addOrEditTypeAndDirection = async (titleSent, direction, type ) => {
  let title = titleSent.toLowerCase();
  let types = [];
  switch (type) {
    case 'Action with Emotion':
      types = ['Action','Emotion'];
      break;
    case 'Action with Emotion & Physical':
      types = ['Action','Emotion', 'Physical'];
      break;
    case 'Action with Physical':
      types = ['Action','Physical'];
      break;
    case 'Emotion':
      types = ['Emotion'];
      break;
    case 'Physical':
      types = ['Physical'];
      break;
    case 'Physical & Emotional':
      types = ['Physical','Emotion'];
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
    case 'positive & negative':
      directions = ['Positive','Negative'];
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
      directions = ['Neutral'];
      console.error('Issue with dertmining direction');
  }

  let typeDirectionProperties = [];

directions.forEach((dir, i) => {
    types.forEach((typ, i) => {
      typeDirectionProperties.push(dir + typ);
  });
});

console.log(typeDirectionProperties)
  let formData = {};
  typeDirectionProperties.forEach((prop, i) => {
    let property = prop;
    console.log(property);
    formData = {
      ...formData,
      [property] : title
    };
  });

console.log('formData');
  console.log(formData);
  let typeDirectionData = await userCategories();
  console.log(typeDirectionData);
  let existingType = {};
  if (typeDirectionData){
    existingType = determineTypeAndDirection(title, typeDirectionData);
    console.log(existingType);
  }
  if (existingType.type === 'No Type' || Object.keys(existingType).length === 0) {
    console.log('No type or empty object')
  }
 else {
   let identifyExistingProperty = existingType.direction + existingType.type;
   console.log(identifyExistingProperty);
   let currentText = typeDirectionData[identifyExistingProperty];
   let removeText = currentText.replace(title, '');
   let removeCommas = removeText.replace(',,',',');
   let lastChar = removeCommas[removeCommas.length - 1];
   console.log(lastChar);
   let finalText = '';
   if (removeCommas.charAt(0) === ',') {
     finalText = removeCommas.substring(1);
   } else if (lastChar === ',') {
     finalText = removeCommas.slice(0, -1);
   } else {
     finalText = removeCommas;
   }
   console.log(existingType);
   console.log(finalText);
   formData = {
     ...formData,
     [identifyExistingProperty]:finalText
   }}
   console.log(formData);
   return formData;
}
