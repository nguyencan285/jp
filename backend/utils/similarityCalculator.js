
const natural = require('natural');

function calculateSimilarity(userSkills, jobDescription) {
  const jobTokens = jobDescription.split(' ');
  const userSkillTokens = userSkills.join(' ').split(' ');

  // Calculate Jaccard similarity between job description and user skills
  const jaccardIndex = natural.JaroWinklerDistance(jobTokens, userSkillTokens);
  
  return jaccardIndex;
}

module.exports = { calculateSimilarity };
