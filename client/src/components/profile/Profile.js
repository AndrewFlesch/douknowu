import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile, deleteProfile} from '../../actions/profile';
import {formatDate} from '../../utils/formatDate';
import { changeUserConfirm } from '../../actions/auth';



const Profile = ({
  getCurrentProfile,
  deleteProfile,
  changeUserConfirm,
  profile: { profile, loading },
  createProfile,
  auth: { user },
  history
}) => {

  const [formData, setFormData] = useState({
    birth: '',
    country: '',
    zip: '',
    city: '',
    gender: '',
    height: '',
    weight: '',
    ethnicityandrace: [],
    industry: '',
    area: '',
    jobtitle: '',
    date: ''
  });

  const {
    birth,
    country,
    zip,
    city,
    gender,
    height,
    weight,
    ethnicityandrace,
    industry,
    area,
    jobtitle
  } = formData;


  const isUnitedStates = (country) => {
    let whatCountry = country;
    if (whatCountry === 'United States of America') {
      document.getElementById("zip").style.display = 'block';
      document.getElementById("city").style.display = 'none';

    } else {
      console.log('Not US ' + whatCountry);
      document.getElementById("zip").style.display = 'none';
      document.getElementById("city").style.display = 'block';
    }
    setFormData({ ...formData, country: whatCountry });
    return whatCountry;
  }

  const htInFeetInches = (height) => {
    let heightTotalInches = height;
    let heightFeet = Math.floor(heightTotalInches/12);
    let heightFeetInch = heightFeet * 12;
    let heightInches = heightTotalInches - heightFeetInch;
    document.querySelector("[name='htft']").value = heightFeet;
    document.querySelector("[name='htin']").value = heightInches;
    return heightTotalInches;
  }

  const htChange = () => {
    let htft = document.querySelector("[name='htft']").value * 12;
    let htftInt = htft ? parseInt(htft) : 0;
    let htin=document.querySelector("[name='htin']").value;
    let htinInt = htin ? parseInt(htin) : 0;
    let htToInches = htftInt + htinInt;
    setFormData({...formData, height: htToInches});
  }


  useEffect(() => {
    getCurrentProfile();
    if (profile) {
    setFormData({
      birth: loading || !profile.birth ? '' : formatDate(profile.birth),
      country: loading || !profile.country ? '' : isUnitedStates(profile.country),
      city: loading || !profile.city ? '' : profile.city,
      zip: loading || !profile.zip ? '' : profile.zip,
      gender: loading || !profile.gender ? '' : profile.gender,
      height: loading || !profile.height ? '' : htInFeetInches(profile.height),
      weight: loading || !profile.weight ? '' : profile.weight,
      ethnicityandrace: loading || !profile.ethnicityandrace ? '' : profile.ethnicityandrace,
      industry: loading || !profile.industry ? '' : profile.industry,
      area: loading || !profile.area ? '' : profile.area,
      jobtitle: loading || !profile.jobtitle ? '' : profile.jobtitle
    })};
  }, [loading, getCurrentProfile, profile ]);



  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSelectChange = () => {
    let select = document.getElementById('ethnicityandrace')
    let ethnic = [...select.options].filter(option => option.selected).map(option => option.value);
    setFormData({...formData, ethnicityandrace: ethnic});
  }

  const onSubmit = e => {
    e.preventDefault();
    console.log(formData);
    createProfile(formData, history);
  }

  const onDelete = () => {
    console.log('button pressed');
    deleteProfile();
    window.location.reload(false);
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>{user && user.name}</h1>
        <div className="useremail">{user && user.email} </div>
        <div className="useremail"><i title="Click to edit your name, email or password" onClick={changeUserConfirm} className="fas fa-edit"></i> Edit your name, email or password.</div>

      <p className='lead'>
        {profile? "Update your profile information" :  "Create a profile and information about yourself. This is not required."}
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
      <div className="form-group">
        <h4>Birth Date</h4>
        <input type="date" className="number" name="birth" value={birth} onChange={e => onChange(e)} />
        <small className="form-text"
          ></small
        >
      </div>
      <div className="form-group">
      <h4>Country</h4>
        <select className="form-control dropdown" id="country" name="country" value={country} onChange={e => isUnitedStates(e.target.value)}>
 <option value="">--- Choose One ---</option>
 <option value="United States of America">United States of America</option>
 <option value="Afganistan">Afghanistan</option>
 <option value="Albania">Albania</option>
 <option value="Algeria">Algeria</option>
 <option value="American Samoa">American Samoa</option>
 <option value="Andorra">Andorra</option>
 <option value="Angola">Angola</option>
 <option value="Anguilla">Anguilla</option>
 <option value="Antigua & Barbuda">Antigua & Barbuda</option>
 <option value="Argentina">Argentina</option>
 <option value="Armenia">Armenia</option>
 <option value="Aruba">Aruba</option>
 <option value="Australia">Australia</option>
 <option value="Austria">Austria</option>
 <option value="Azerbaijan">Azerbaijan</option>
 <option value="Bahamas">Bahamas</option>
 <option value="Bahrain">Bahrain</option>
 <option value="Bangladesh">Bangladesh</option>
 <option value="Barbados">Barbados</option>
 <option value="Belarus">Belarus</option>
 <option value="Belgium">Belgium</option>
 <option value="Belize">Belize</option>
 <option value="Benin">Benin</option>
 <option value="Bermuda">Bermuda</option>
 <option value="Bhutan">Bhutan</option>
 <option value="Bolivia">Bolivia</option>
 <option value="Bonaire">Bonaire</option>
 <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
 <option value="Botswana">Botswana</option>
 <option value="Brazil">Brazil</option>
 <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
 <option value="Brunei">Brunei</option>
 <option value="Bulgaria">Bulgaria</option>
 <option value="Burkina Faso">Burkina Faso</option>
 <option value="Burundi">Burundi</option>
 <option value="Cambodia">Cambodia</option>
 <option value="Cameroon">Cameroon</option>
 <option value="Canada">Canada</option>
 <option value="Canary Islands">Canary Islands</option>
 <option value="Cape Verde">Cape Verde</option>
 <option value="Cayman Islands">Cayman Islands</option>
 <option value="Central African Republic">Central African Republic</option>
 <option value="Chad">Chad</option>
 <option value="Channel Islands">Channel Islands</option>
 <option value="Chile">Chile</option>
 <option value="China">China</option>
 <option value="Christmas Island">Christmas Island</option>
 <option value="Cocos Island">Cocos Island</option>
 <option value="Colombia">Colombia</option>
 <option value="Comoros">Comoros</option>
 <option value="Congo">Congo</option>
 <option value="Cook Islands">Cook Islands</option>
 <option value="Costa Rica">Costa Rica</option>
 <option value="Cote DIvoire">Cote DIvoire</option>
 <option value="Croatia">Croatia</option>
 <option value="Cuba">Cuba</option>
 <option value="Curaco">Curacao</option>
 <option value="Cyprus">Cyprus</option>
 <option value="Czech Republic">Czech Republic</option>
 <option value="Denmark">Denmark</option>
 <option value="Djibouti">Djibouti</option>
 <option value="Dominica">Dominica</option>
 <option value="Dominican Republic">Dominican Republic</option>
 <option value="East Timor">East Timor</option>
 <option value="Ecuador">Ecuador</option>
 <option value="Egypt">Egypt</option>
 <option value="El Salvador">El Salvador</option>
 <option value="Equatorial Guinea">Equatorial Guinea</option>
 <option value="Eritrea">Eritrea</option>
 <option value="Estonia">Estonia</option>
 <option value="Ethiopia">Ethiopia</option>
 <option value="Falkland Islands">Falkland Islands</option>
 <option value="Faroe Islands">Faroe Islands</option>
 <option value="Fiji">Fiji</option>
 <option value="Finland">Finland</option>
 <option value="France">France</option>
 <option value="French Guiana">French Guiana</option>
 <option value="French Polynesia">French Polynesia</option>
 <option value="French Southern Ter">French Southern Ter</option>
 <option value="Gabon">Gabon</option>
 <option value="Gambia">Gambia</option>
 <option value="Georgia">Georgia</option>
 <option value="Germany">Germany</option>
 <option value="Ghana">Ghana</option>
 <option value="Gibraltar">Gibraltar</option>
 <option value="Great Britain">Great Britain</option>
 <option value="Greece">Greece</option>
 <option value="Greenland">Greenland</option>
 <option value="Grenada">Grenada</option>
 <option value="Guadeloupe">Guadeloupe</option>
 <option value="Guam">Guam</option>
 <option value="Guatemala">Guatemala</option>
 <option value="Guinea">Guinea</option>
 <option value="Guyana">Guyana</option>
 <option value="Haiti">Haiti</option>
 <option value="Hawaii">Hawaii</option>
 <option value="Honduras">Honduras</option>
 <option value="Hong Kong">Hong Kong</option>
 <option value="Hungary">Hungary</option>
 <option value="Iceland">Iceland</option>
 <option value="Indonesia">Indonesia</option>
 <option value="India">India</option>
 <option value="Iran">Iran</option>
 <option value="Iraq">Iraq</option>
 <option value="Ireland">Ireland</option>
 <option value="Isle of Man">Isle of Man</option>
 <option value="Israel">Israel</option>
 <option value="Italy">Italy</option>
 <option value="Jamaica">Jamaica</option>
 <option value="Japan">Japan</option>
 <option value="Jordan">Jordan</option>
 <option value="Kazakhstan">Kazakhstan</option>
 <option value="Kenya">Kenya</option>
 <option value="Kiribati">Kiribati</option>
 <option value="Korea North">Korea North</option>
 <option value="Korea Sout">Korea South</option>
 <option value="Kuwait">Kuwait</option>
 <option value="Kyrgyzstan">Kyrgyzstan</option>
 <option value="Laos">Laos</option>
 <option value="Latvia">Latvia</option>
 <option value="Lebanon">Lebanon</option>
 <option value="Lesotho">Lesotho</option>
 <option value="Liberia">Liberia</option>
 <option value="Libya">Libya</option>
 <option value="Liechtenstein">Liechtenstein</option>
 <option value="Lithuania">Lithuania</option>
 <option value="Luxembourg">Luxembourg</option>
 <option value="Macau">Macau</option>
 <option value="Macedonia">Macedonia</option>
 <option value="Madagascar">Madagascar</option>
 <option value="Malaysia">Malaysia</option>
 <option value="Malawi">Malawi</option>
 <option value="Maldives">Maldives</option>
 <option value="Mali">Mali</option>
 <option value="Malta">Malta</option>
 <option value="Marshall Islands">Marshall Islands</option>
 <option value="Martinique">Martinique</option>
 <option value="Mauritania">Mauritania</option>
 <option value="Mauritius">Mauritius</option>
 <option value="Mayotte">Mayotte</option>
 <option value="Mexico">Mexico</option>
 <option value="Midway Islands">Midway Islands</option>
 <option value="Moldova">Moldova</option>
 <option value="Monaco">Monaco</option>
 <option value="Mongolia">Mongolia</option>
 <option value="Montserrat">Montserrat</option>
 <option value="Morocco">Morocco</option>
 <option value="Mozambique">Mozambique</option>
 <option value="Myanmar">Myanmar</option>
 <option value="Nambia">Nambia</option>
 <option value="Nauru">Nauru</option>
 <option value="Nepal">Nepal</option>
 <option value="Netherland Antilles">Netherland Antilles</option>
 <option value="Netherlands">Netherlands (Holland, Europe)</option>
 <option value="Nevis">Nevis</option>
 <option value="New Caledonia">New Caledonia</option>
 <option value="New Zealand">New Zealand</option>
 <option value="Nicaragua">Nicaragua</option>
 <option value="Niger">Niger</option>
 <option value="Nigeria">Nigeria</option>
 <option value="Niue">Niue</option>
 <option value="Norfolk Island">Norfolk Island</option>
 <option value="Norway">Norway</option>
 <option value="Oman">Oman</option>
 <option value="Pakistan">Pakistan</option>
 <option value="Palau Island">Palau Island</option>
 <option value="Palestine">Palestine</option>
 <option value="Panama">Panama</option>
 <option value="Papua New Guinea">Papua New Guinea</option>
 <option value="Paraguay">Paraguay</option>
 <option value="Peru">Peru</option>
 <option value="Phillipines">Philippines</option>
 <option value="Pitcairn Island">Pitcairn Island</option>
 <option value="Poland">Poland</option>
 <option value="Portugal">Portugal</option>
 <option value="Puerto Rico">Puerto Rico</option>
 <option value="Qatar">Qatar</option>
 <option value="Republic of Montenegro">Republic of Montenegro</option>
 <option value="Republic of Serbia">Republic of Serbia</option>
 <option value="Reunion">Reunion</option>
 <option value="Romania">Romania</option>
 <option value="Russia">Russia</option>
 <option value="Rwanda">Rwanda</option>
 <option value="St Barthelemy">St Barthelemy</option>
 <option value="St Eustatius">St Eustatius</option>
 <option value="St Helena">St Helena</option>
 <option value="St Kitts-Nevis">St Kitts-Nevis</option>
 <option value="St Lucia">St Lucia</option>
 <option value="St Maarten">St Maarten</option>
 <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
 <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
 <option value="Saipan">Saipan</option>
 <option value="Samoa">Samoa</option>
 <option value="Samoa American">Samoa American</option>
 <option value="San Marino">San Marino</option>
 <option value="Sao Tome & Principe">Sao Tome & Principe</option>
 <option value="Saudi Arabia">Saudi Arabia</option>
 <option value="Senegal">Senegal</option>
 <option value="Seychelles">Seychelles</option>
 <option value="Sierra Leone">Sierra Leone</option>
 <option value="Singapore">Singapore</option>
 <option value="Slovakia">Slovakia</option>
 <option value="Slovenia">Slovenia</option>
 <option value="Solomon Islands">Solomon Islands</option>
 <option value="Somalia">Somalia</option>
 <option value="South Africa">South Africa</option>
 <option value="Spain">Spain</option>
 <option value="Sri Lanka">Sri Lanka</option>
 <option value="Sudan">Sudan</option>
 <option value="Suriname">Suriname</option>
 <option value="Swaziland">Swaziland</option>
 <option value="Sweden">Sweden</option>
 <option value="Switzerland">Switzerland</option>
 <option value="Syria">Syria</option>
 <option value="Tahiti">Tahiti</option>
 <option value="Taiwan">Taiwan</option>
 <option value="Tajikistan">Tajikistan</option>
 <option value="Tanzania">Tanzania</option>
 <option value="Thailand">Thailand</option>
 <option value="Togo">Togo</option>
 <option value="Tokelau">Tokelau</option>
 <option value="Tonga">Tonga</option>
 <option value="Trinidad & Tobago">Trinidad & Tobago</option>
 <option value="Tunisia">Tunisia</option>
 <option value="Turkey">Turkey</option>
 <option value="Turkmenistan">Turkmenistan</option>
 <option value="Turks & Caicos Is">Turks & Caicos Is</option>
 <option value="Tuvalu">Tuvalu</option>
 <option value="Uganda">Uganda</option>
 <option value="United Kingdom">United Kingdom</option>
 <option value="Ukraine">Ukraine</option>
 <option value="United Arab Erimates">United Arab Emirates</option>
 <option value="United States of America">United States of America</option>
 <option value="Uraguay">Uruguay</option>
 <option value="Uzbekistan">Uzbekistan</option>
 <option value="Vanuatu">Vanuatu</option>
 <option value="Vatican City State">Vatican City State</option>
 <option value="Venezuela">Venezuela</option>
 <option value="Vietnam">Vietnam</option>
 <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
 <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
 <option value="Wake Island">Wake Island</option>
 <option value="Wallis & Futana Is">Wallis & Futana Is</option>
 <option value="Yemen">Yemen</option>
 <option value="Zaire">Zaire</option>
 <option value="Zambia">Zambia</option>
 <option value="Zimbabwe">Zimbabwe</option>
        </select>
      </div>
      <div id="zip" className="form-group">
            <h4>Zip Code</h4>
        <input type="number" placeholder="zip" name="zip" value={zip} onChange={e => onChange(e)} />
      </div>
      <div id="city" className="form-group">
            <h4>City/Town/Village</h4>
        <input type="text" placeholder="" name="city" value={city} onChange={e => onChange(e)} />
      </div>
      <div className="form-group">
            <h4>Gender</h4>
            <select className="form-control dropdown" id="gender" name="gender" value={gender} onChange={e => onChange(e)}>
            <option value=""> --- Choose One --- </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            </select>
      </div>


      <div className="form-group">
                <h4>Height</h4>
            <div className="inline"><input type="number" placeholder="Ft" name="htft" onChange={e => htChange(e)} /> Feet </div>
            <div className="inline"><input type="number" placeholder="In" name="htin" onChange={e => htChange(e)} /> Inches </div>
            <div><input type="hidden" placeholder="In" name="htin" value={height} /></div>
          </div>

      <div className="form-group">
        <div className="weight">
            <h4>Weight (lbs)</h4>
        <input type="number" placeholder="" min="0" className="number" name="weight" value={weight} onChange={e => onChange(e)} />
      </div>
      </div>

      <div className="form-group">
        <h4>Ethnicity & Race</h4>
        <select multiple size="6" className="form-control dropdown" id="ethnicityandrace" name="ethnicityandrace" value={ethnicityandrace} onChange={e => onSelectChange(e)}>
  <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
  <option value="Asian">Asian</option>
  <option value="Black or African American">Black or African American</option>
  <option value="Hispanic or Latino">Hispanic or Latino</option>
  <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
  <option value="White">White</option>
</select>
      </div>

        <div className="form-group">
          <h4>Industry</h4>
            <select className="form-control dropdown" id="industry" name="industry" value={industry} onChange={e => onChange(e)}>
          <option value="Choose"> --- Choose One --- </option>
        <option value="Accounting">Accounting</option>
        <option value="Airlines/Aviation">Airlines/Aviation</option>
        <option value="Alternative Dispute Resolution">Alternative Dispute Resolution</option>
        <option value="Alternative Medicine">Alternative Medicine</option>
        <option value="Animation">Animation</option>
        <option value="Apparel/Fashion">Apparel/Fashion</option>
        <option value="Architecture/Planning">Architecture/Planning</option>
        <option value="Arts/Crafts">Arts/Crafts</option>
        <option value="Automotive">Automotive</option>
        <option value="Aviation/Aerospace">Aviation/Aerospace</option>
        <option value="Banking/Mortgage">Banking/Mortgage</option>
        <option value="Biotechnology/Greentech">Biotechnology/Greentech</option>
        <option value="Broadcast Media">Broadcast Media</option>
        <option value="Building Materials">Building Materials</option>
        <option value="Business Supplies/Equipment">Business Supplies/Equipment</option>
        <option value="Capital Markets/Hedge Fund/Private Equity">Capital Markets/Hedge Fund/Private Equity</option>
        <option value="Chemicals">Chemicals</option>
        <option value="Civic/Social Organization">Civic/Social Organization</option>
        <option value="Civil Engineering">Civil Engineering</option>
        <option value="Commercial Real Estate">Commercial Real Estate</option>
        <option value="Computer Games">Computer Games</option>
        <option value="Computer Hardware">Computer Hardware</option>
        <option value="Computer Networking">Computer Networking</option>
        <option value="Computer Software/Engineering">Computer Software/Engineering</option>
        <option value="Computer/Network Security">Computer/Network Security</option>
        <option value="Construction">Construction</option>
        <option value="Consumer Electronics">Consumer Electronics</option>
        <option value="Consumer Goods">Consumer Goods</option>
        <option value="Consumer Services">Consumer Services</option>
        <option value="Cosmetics">Cosmetics</option>
        <option value="Dairy">Dairy</option>
        <option value="Defense/Space">Defense/Space</option>
        <option value="Design">Design</option>
        <option value="E-Learning">E-Learning</option>
        <option value="Education Management">Education Management</option>
        <option value="Electrical/Electronic Manufacturing">Electrical/Electronic Manufacturing</option>
        <option value="Entertainment/Movie Production">Entertainment/Movie Production</option>
        <option value="Environmental Services">Environmental Services</option>
        <option value="Events Services">Events Services</option>
        <option value="Executive Office">Executive Office</option>
        <option value="Facilities Services">Facilities Services</option>
        <option value="Farming">Farming</option>
        <option value="Financial Services">Financial Services</option>
        <option value="Fine Art">Fine Art</option>
        <option value="Fishery">Fishery</option>
        <option value="Food Production">Food Production</option>
        <option value="Food/Beverages">Food/Beverages</option>
        <option value="Fundraising">Fundraising</option>
        <option value="Furniture">Furniture</option>
        <option value="Gambling/Casinos">Gambling/Casinos</option>
        <option value="Glass/Ceramics/Concrete">Glass/Ceramics/Concrete</option>
        <option value="Government Administration">Government Administration</option>
        <option value="Government Relations">Government Relations</option>
        <option value="Graphic Design/Web Design">Graphic Design/Web Design</option>
        <option value="Health/Fitness">Health/Fitness</option>
        <option value="Higher Education/Acadamia">Higher Education/Acadamia</option>
        <option value="Hospital/Health Care">Hospital/Health Care</option>
        <option value="Hospitality">Hospitality</option>
        <option value="Human Resources/HR">Human Resources/HR</option>
        <option value="Import/Export">Import/Export</option>
        <option value="Individual/Family Services">Individual/Family Services</option>
        <option value="Industrial Automation">Industrial Automation</option>
        <option value="Information Services">Information Services</option>
        <option value="Information Technology/IT">Information Technology/IT</option>
        <option value="Insurance">Insurance</option>
        <option value="International Affairs">International Affairs</option>
        <option value="International Trade/Development">International Trade/Development</option>
        <option value="Internet">Internet</option>
        <option value="Investment Banking/Venture">Investment Banking/Venture</option>
        <option value="Investment Management/Hedge Fund/Private Equity">Investment Management/Hedge Fund/Private Equity</option>
        <option value="Judiciary">Judiciary</option>
        <option value="Law Enforcement">Law Enforcement</option>
        <option value="Law Practice/Law Firms">Law Practice/Law Firms</option>
        <option value="Legal Services">Legal Services</option>
        <option value="Legislative Office">Legislative Office</option>
        <option value="Leisure/Travel">Leisure/Travel</option>
        <option value="Library">Library</option>
        <option value="Logistics/Procurement">Logistics/Procurement</option>
        <option value="Luxury Goods/Jewelry">Luxury Goods/Jewelry</option>
        <option value="Machinery">Machinery</option>
        <option value="Management Consulting">Management Consulting</option>
        <option value="Maritime">Maritime</option>
        <option value="Market Research">Market Research</option>
        <option value="Marketing/Advertising/Sales">Marketing/Advertising/Sales</option>
        <option value="Mechanical or Industrial Engineering">Mechanical or Industrial Engineering</option>
        <option value="Media Production">Media Production</option>
        <option value="Medical Equipment">Medical Equipment</option>
        <option value="Medical Practice">Medical Practice</option>
        <option value="Mental Health Care">Mental Health Care</option>
        <option value="Military Industry">Military Industry</option>
        <option value="Mining/Metals">Mining/Metals</option>
        <option value="Motion Pictures/Film">Motion Pictures/Film</option>
        <option value="Museums/Institutions">Museums/Institutions</option>
        <option value="Music">Music</option>
        <option value="Nanotechnology">Nanotechnology</option>
        <option value="Newspapers/Journalism">Newspapers/Journalism</option>
        <option value="Non-Profit/Volunteering">Non-Profit/Volunteering</option>
        <option value="Oil/Energy/Solar/Greentech">Oil/Energy/Solar/Greentech</option>
        <option value="Online Publishing">Online Publishing</option>
        <option value="Other Industry">Other Industry</option>
        <option value="Outsourcing/Offshoring">Outsourcing/Offshoring</option>
        <option value="Package/Freight Delivery">Package/Freight Delivery</option>
        <option value="Packaging/Containers">Packaging/Containers</option>
        <option value="Paper/Forest Products">Paper/Forest Products</option>
        <option value="Performing Arts">Performing Arts</option>
        <option value="Pharmaceuticals">Pharmaceuticals</option>
        <option value="Philanthropy">Philanthropy</option>
        <option value="Photography">Photography</option>
        <option value="Plastics">Plastics</option>
        <option value="Political Organization">Political Organization</option>
        <option value="Primary/Secondary Education">Primary/Secondary Education</option>
        <option value="Printing">Printing</option>
        <option value="Professional Training">Professional Training</option>
        <option value="Program Development">Program Development</option>
        <option value="Public Relations/PR">Public Relations/PR</option>
        <option value="Public Safety">Public Safety</option>
        <option value="Publishing Industry">Publishing Industry</option>
        <option value="Railroad Manufacture">Railroad Manufacture</option>
        <option value="Ranching">Ranching</option>
        <option value="Real Estate/Mortgage">Real Estate/Mortgage</option>
        <option value="Recreational Facilities/Services">Recreational Facilities/Services</option>
        <option value="Religious Institutions">Religious Institutions</option>
        <option value="Renewables/Environment">Renewables/Environment</option>
        <option value="Research Industry">Research Industry</option>
        <option value="Restaurants">Restaurants</option>
        <option value="Retail Industry">Retail Industry</option>
        <option value="Security/Investigations">Security/Investigations</option>
        <option value="Semiconductors">Semiconductors</option>
        <option value="Shipbuilding">Shipbuilding</option>
        <option value="Sporting Goods">Sporting Goods</option>
        <option value="Sports">Sports</option>
        <option value="Staffing/Recruiting">Staffing/Recruiting</option>
        <option value="Supermarkets">Supermarkets</option>
        <option value="Telecommunications">Telecommunications</option>
        <option value="Textiles">Textiles</option>
        <option value="Think Tanks">Think Tanks</option>
        <option value="Tobacco">Tobacco</option>
        <option value="Translation/Localization">Translation/Localization</option>
        <option value="Transportation">Transportation</option>
        <option value="Utilities">Utilities</option>
        <option value="Venture Capital/VC">Venture Capital/VC</option>
        <option value="Veterinary">Veterinary</option>
        <option value="Warehousing">Warehousing</option>
        <option value="Wholesale">Wholesale</option>
        <option value="Wine/Spirits">Wine/Spirits</option>
        <option value="Wireless">Wireless</option>
        <option value="Writing/Editing">Writing/Editing</option>
  </select>

        </div>

        <div className="form-group">
          <h4>Area or Department</h4>
          <select className="form-control dropdown" id="area" name="area" value={area} onChange={e => onChange(e)}>
          <option value=""> --- Choose One --- </option>
          <option value="Accounting">Accounting</option>
<option value="Executive">Executive</option>
<option value="Finance">Finance</option>
<option value="Human Resources">Human Resources</option>
<option value="Legal">Legal</option>
<option value="Management">Management</option>
<option value="Other">Other</option>
<option value="Procurement">Procurement</option>
<option value="Project Management">Project Management</option>
<option value="Sales">Sales</option>
<option value="Support">Support</option>
<option value="Technology">Technology</option>

          </select>
        </div>


              <div className="form-group">
                    <h4>Job Title</h4>
                <input type="text" placeholder="" name="jobtitle" value={jobtitle} onChange={e => onChange(e)} />
              </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
        {profile? <Fragment><Link className='btn btn-light my-1' to='/dashboard'>Cancel</Link>
        <button type='button' onClick={onDelete} className='btn btn-light my-1'>Delete</button></Fragment> : <Link className='btn btn-light my-1' to='/dashboard'>Skip</Link>}
      </form>
    </Fragment>
  );
};

Profile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  changeUserConfirm: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile, deleteProfile, changeUserConfirm }
)(withRouter(Profile));
