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
            <p className="suggestion-title">
              <i className={`title-icon fa fa-${suggestion.icon}`}></i>
              {suggestion.title}
            </p>
            <p className="suggestion-description">{suggestion.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
