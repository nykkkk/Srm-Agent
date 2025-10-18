export const ImprovementSuggestions = ({ data }) => {
  return (
    <div className="report-card improvement-suggestions">
      <h3 className="suggestions-header">
        <i className="suggestions-icon fa fa-list-ul"></i>
        改进建议
      </h3>

      <div className="suggestions-list">
        {data.suggestions.map((suggestion, index) => (
          <div key={index} className="suggestion-item">
            <div className="suggestion-title">
              <div className={`title-icon`}></div>
              {suggestion.title}
            </div>
            <div className="suggestion-description">{suggestion.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
