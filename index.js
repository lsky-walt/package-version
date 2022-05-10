const nodeVersion = require("parse-node-version")

const parse = (version) => {
  const v = version
    .trim()
    .replace(/\^/g, "")
    .replace(/\</g, "")
    .replace(/\>/g, "")
    .replace(/\=/g, "")
  if (/^v/.test(v)) {
    return nodeVersion(v)
  }
  return nodeVersion(`v${v}`)
}

const packageVersion = (version, mode = "patch") => {
  const o = parse(version)
  let v = ""
  const { major, minor, patch, pre = "" } = o
  switch (mode) {
    case "major":
      v = `${major + 1}.0.0`
      break
    case "minor":
      v = `${major}.${minor + 1}.0`
      break
    case "patch":
      v = `${major}.${minor}.${patch + 1}`
      break
    case "pre":
      // rc.xxx
      let rcNumber = 0
      if (pre) {
        rcNumber = pre.replace(/[^0-9]/g, "")
      }
      v = `${major}.${minor}.${patch}-rc.${parseInt(rcNumber) + 1}`
      break
    default:
      v = `${major}.${minor}.${patch + 1}`
      break
  }
  return v
}

module.exports = packageVersion
