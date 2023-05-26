import React from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = ({ searchTerm, searchValue, setIsLoading, setSearchResults }) => {
  const handleClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <span className="content">
      <a href="#" onClick={handleClick}>
        {searchValue}
      </a>
    </span>
  );
};

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */

const Feature = ({ featuredResult, setIsLoading, setSearchResults }) => {
    if (!featuredResult) {
      return <main id="feature"></main>;
    }
  
    const {
      title,
      dated,
      images,
      primaryimageurl,
      description,
      culture,
      style,
      technique,
      medium,
      dimensions,
      people,
      department,
      division,
      contact,
      creditline,
    } = featuredResult;
  
    return (
      <main id="feature">
        <div className="object-feature">
          <header>
            {title && <h3>{title}</h3>}
            {dated && <h4>{dated}</h4>}
          </header>
          <section className="facts">
            {title && (
              <>
                <span className="title">Title:</span>
                <span className="content">{title}</span>
              </>
            )}
            {dated && (
              <>
                <span className="title">Dated:</span>
                <span className="content">{dated}</span>
              </>
            )}
            {primaryimageurl && (
              <>
                <span className="title"></span>
                <span className="content">
                  <img src={primaryimageurl} />
                </span>
              </>
            )}
            {description && (
              <>
                <span className="title">Description:</span>
                <span className="content">{description}</span>
              </>
            )}
            {Array.isArray(culture) && culture.length > 0 && (
              <>
                <span className="title">Culture:</span>
                <span className="content">
                  {culture.map((item, index) => (
                    <Searchable
                      key={index}
                      searchTerm="culture"
                      searchValue={item}
                      setIsLoading={setIsLoading}
                      setSearchResults={setSearchResults}
                    />
                  ))}
                </span>
              </>
            )}
            {style && (
              <>
                <span className="title">Style:</span>
                <span className="content">{style}</span>
              </>
            )}
            {technique && (
              <>
                <span className="title">Technique:</span>
                <span className="content">
                  <Searchable
                    searchTerm="technique"
                    searchValue={technique.toLowerCase()}
                    setIsLoading={setIsLoading}
                    setSearchResults={setSearchResults}
                  />
                </span>
              </>
            )}
            {medium && (
              <>
                <span className="title">Medium:</span>
                <span className="content">
                  <Searchable
                    searchTerm="medium"
                    searchValue={medium}
                    setIsLoading={setIsLoading}
                    setSearchResults={setSearchResults}
                  />
                </span>
              </>
            )}
                      {dimensions && (
            <>
              <span className="title">Dimensions:</span>
              <span className="content">{dimensions}</span>
            </>
          )}
        {people && people.length > 0 && (
        <>
            <span className="title">People:</span>
            <span className="content">
            {people.map((person, index) => (
                <Searchable
                key={index}
                searchTerm="people"
                searchValue={person.name} 
                setIsLoading={setIsLoading}
                setSearchResults={setSearchResults}
                />
            ))}
            </span>
        </>
        )}
          {department && (
            <>
              <span className="title">Department:</span>
              <span className="content">{department}</span>
            </>
          )}
          {division && (
            <>
              <span className="title">Division:</span>
              <span className="content">{division}</span>
            </>
          )}
          {contact && (
            <>
              <span className="title">Contact:</span>
              <span className="content">{contact}</span>
            </>
          )}
          {creditline && (
            <>
              <span className="title">Credit Line:</span>
              <span className="content">{creditline}</span>
            </>
          )}
          </section>
        </div>
      </main>
    );
  };

export default Feature;
