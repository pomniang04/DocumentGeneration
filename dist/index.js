metadata = {
  systemName: "GenerateDocument",
  displayName: "Generate Document",
  description: "Service to generate document",
  configuration: {
    mbh: {
      displayName: "MBH Workflow",
      type: "string"
    },
    anotherWorkflow: {
      displayName: "Another Workflow",
      type: "string"
    },
    ServiceKey: {
      displayName: "Service Key for document generation",
      type: "number",
      required: !0,
      value: "1"
    },
    stringFormat: {
      displayName: "String Format",
      type: "string",
      value: "Alphanumeric"
    }
  }
};
ondescribe = async function({ configuration: a }) {
  a.documentType && a.documentType.toString(), postSchema({
    objects: {
      document: {
        displayName: "Document",
        description: "Manages document generation",
        properties: {
          id: {
            displayName: "ID",
            type: "number"
          },
          name: {
            displayName: "Name",
            type: "string"
          },
          type: {
            displayName: "Type",
            type: "string"
          },
          base64Data: {
            displayName: "Base64 Data",
            type: "string"
          },
          jsonData1: {
            displayName: "JSON Data 1",
            type: "string"
          },
          jsonData2: {
            displayName: "JSON Data 2",
            type: "string"
          },
          jsonData3: {
            displayName: "JSON Data 3",
            type: "string"
          },
          jsonData4: {
            displayName: "JSON Data 4",
            type: "string"
          },
          documentType: {
            displayName: "Document Type",
            type: "string"
          }
        },
        methods: {
          generate: {
            displayName: "Generate Document",
            type: "execute",
            inputs: ["id", "name", "type", "base64Data", "jsonData1", "jsonData2", "jsonData3", "jsonData4", "documentType"],
            outputs: ["jsonResult"]
          }
        }
      }
    }
  });
};
onexecute = async function({
  objectName: a,
  methodName: n,
  parameters: o,
  properties: s,
  configuration: e,
  schema: r
}) {
  switch (a) {
    case "document":
      await D(n, s);
      break;
    default:
      throw new Error("The object " + a + " is not supported.");
  }
};
async function D(a, n, o, s) {
  switch (a) {
    case "generate":
      await g(n);
      break;
    default:
      throw new Error("The method " + a + " is not supported.");
  }
}
async function g(a, n) {
  try {
    const o = a.type.toString(), s = a.documentType.toString(), e = await f(a, o, s);
    postResult({
      jsonResult: JSON.stringify(e)
    });
  } catch (o) {
    throw new Error("Error generating document: " + o.message);
  }
}
function f(a, n, o) {
  switch (n) {
    case "mbh":
      return B(a, o);
    case "anotherWorkflow":
      return Promise.resolve({ message: "Another workflow not implemented yet." });
    default:
      return Promise.reject(new Error("Unsupported workflow type: " + n));
  }
}
function B(a, n) {
  return new Promise((o, s) => {
    try {
      const e = JSON.parse(a.jsonData1.toString()), r = JSON.parse(a.jsonData2.toString()), u = JSON.parse(a.jsonData3.toString()), l = JSON.parse(a.jsonData4.toString()), c = r.value, N = u.value, i = l.value;
      console.log("document_attach", i);
      const d = i.reduce((t, p) => (t[p.NCR_ID] = p["File@odata.mediaReadLink"], t), {}), m = c.map((t) => ({
        plan_A: t.MBH_NCR_Description || "",
        plan_B: t.MBH_NCR_ActionPICEmail || "",
        plan_C: t.MBH_NCR_PlanDate.substring(0, 10) || "",
        plan_D: t.MBH_NCR_Response || "",
        plan_E: t.MBH_NCR_ExectionDate.substring(0, 10) || "",
        plan_F: d[t.MBH_NCR_NCRID_fk] || ""
      })), C = c.map((t) => ({
        resume_A: t.MBH_NCR_Description || "",
        resume_B: t.MBH_NCR_PlanDate.substring(0, 10) || "",
        resume_C: t.MBH_NCR_ActionPlanApprovalStatusByQuality || "",
        resume_D: t.MBH_NCR_ActionPlanApprovalStatusByClient || "",
        resume_E: t.MBH_NCR_ActionResponseApprovalStatusByPlanPIC === "Oui" ? "Satisfaisant" : "",
        resume_F: t.MBH_NCR_ActionResponseApprovalStatusByClient || ""
      })), y = N.map((t) => ({
        historique_A: t.ODataProperty__GCPC_NCR_PICEmail || "",
        historique_B: t.GCPC_NCR_ResponseDate.substring(0, 10) || "",
        historique_C: t.GCPC_NCR_Step || "",
        historique_D: t.GCPC_NCR_Comment || ""
      })), R = i.map((t) => ({
        doc_A: t.FileName || "",
        doc_B: t.FileDescription || "",
        doc_C: t.Comment || "",
        doc_D: t.UploadedBy || "",
        doc_E: t.Upload_Date.substring(0, 10) || "",
        doc_F: t.FileName || "",
        doc_G: t["File@odata.mediaReadLink"] || "",
        doc_H: t.Step || ""
      }));
      console.log("payload1", e);
      const _ = {
        instance_A: e.UCI || "",
        instance_B: "MBH NCR",
        instance_C: e.NCRStatus || "",
        instance_D: e.InitiatorName || "",
        instance_E: e.InitiatorEmail || "",
        instance_F: e.NCRRequestDate.substring(0, 10) || "",
        info_A: e.NCRLot || "",
        info_B: e.NCRProjectNumber || "",
        info_C: e.ProjectTitle || "",
        info_D: e.NCRContractTitle || "",
        info_E: e.NCRContractNumber || "",
        info_F: e.STMDesignRepresentative || "",
        info_G: e.RepresentativeAdjudicateur || "",
        info_H: e.NCRIssuer || "",
        info_I: e.NCRSector || "",
        info_J: e.NCRWBS || "",
        info_K: e.NCRDiscipline || "",
        info_L: e.MBH_NCR_For || "",
        info_M: e.MBH_NCR_Activity || "",
        info_N: e.MBH_NCR_IsSubcontractor || "",
        info_O: e.MBH_NCR_SousActivity || "",
        info_Q: e.WBSTEXT || "",
        ref_chantier_pie: e.MBH_NCR_Reference || "",
        categorie_nc: e.NCRCategory || "",
        titre: e.NCRTitle || "",
        date: e.NCRDate.substring(0, 10) || "",
        autre_ref: e.NCROtherReference || "",
        date_reponse: e.NCRResponseRequiredBy.substring(0, 10) || "",
        type_nc: e.MBH_NCR_Type || "",
        sous_type_nc: e.MBH_NCR_SubType || "",
        description: e.NCRDescription || "",
        gerant_projet: e.MBH_NCR_ProjectManagerEmail || "",
        impact: e.MBH_NCR_ImpactPlanAsBuilt || "",
        tables: [
          { anchor: "plan_A", data: m },
          { anchor: "resume_A", data: C },
          { anchor: "doc_A", data: R },
          { anchor: "historique_A", data: y }
        ],
        outputName: n === "pdf" ? "MBH_NCR_RNC_Main_Form.pdf" : "MBH_NCR_RNC_Main_Form.docx",
        base64File: a.base64Data.toString()
      };
      console.log("jsonobject", _), o(_);
    } catch (e) {
      s(e);
    }
  });
}
//# sourceMappingURL=index.js.map
