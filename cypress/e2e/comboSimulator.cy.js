describe("Basic App Load", () => {
  beforeEach(() => {
    cy.visit("/saga-frontier-combo-simulator");
  })

  it("visits the app root url", () => {
    cy.contains("SaGa Frontier Combo Simulator").should("exist");
  });

  it("renders five visible skill cards", () => {
    cy.get("div.column.p-0").should('have.length', 5);
  });

  it("should have no visible combo cards", () => {
    cy.get("div.main-box").get('div.column.is-narrow').should('not.contain.text', /^[1-5]$/);
  });
});

describe("Basic App Interactions", () => {
  beforeEach(() => {
    cy.visit("/saga-frontier-combo-simulator");
  })

  it("clicking a skill dropdown should produce a menu", () => {
    cy.contains("No Skill Selected").click();
    cy.contains("Sword").should('exist');
    cy.contains("StunSlash").should('not.exist');
  });

  it("clicking a skill category should show skills", () => {
    cy.contains("No Skill Selected").click();
    cy.contains("Sword").click();
    cy.contains("StunSlash").should('exist');
  });

  it("clicking remastered names should change options", () => {
    cy.contains("No Skill Selected").click();
    cy.contains("Sword").click();
    cy.contains("StunSlash").should('exist');
    cy.contains("Remastered Names").find('input').check();
    cy.contains("StunSlash").should('not.exist');
    cy.contains("Knee Split").should('exist');
  });

  it("clicking a dropdown option will change drop down text", () => {
    cy.contains("No Skill Selected").click();
    cy.contains("Sword").click();
    cy.contains("StunSlash").click();
    cy.contains("StunSlash").should('have.length', 1);

    cy.get('div.dropdown.block > div.dropdown-trigger > button.button').should(($skillCards) => {
      let noSkillSelected = 0;
      let stunSlash = 0;

      $skillCards.each((_,$skillCard) => {
        if($skillCard.textContent === "No Skill Selected") {
          noSkillSelected += 1
        } else if ($skillCard.textContent === "StunSlash") {
          stunSlash += 1;
        }
      });

      expect(noSkillSelected).equal(4);
      expect(stunSlash).equal(1);
    });
  });
});

describe("Combo and dropdown interactions", () => {
  beforeEach(() => {
    cy.visit("/saga-frontier-combo-simulator");
    cy.get('div.column.p-0').as("skillCards");
    cy.get('div.column.is-narrow').as("comboCards");
  });

  it("should show a combo panel for a level 2 combo", () => {
    cy.get("@skillCards").selectSkill(0, "Katana", "MoonlightCut");
    cy.get("@skillCards").selectSkill(1, "Sword", "StunSlash");

    cy.get('@comboCards').hasComboLevel(0, 2);
  });

  it("should show multiple panels for multiple combos", () => {
    cy.get("@skillCards").selectSkill(0, "Katana", "MoonlightCut");
    cy.get("@skillCards").selectSkill(1, "Sword", "StunSlash");
    cy.get("@skillCards").selectSkill(2, "Sword", "DoubleSlash");
    cy.get("@skillCards").selectSkill(3, "Katana", "MoonlightCut");
    cy.get("@skillCards").selectSkill(4, "Sword", "StunSlash");

    cy.get('@comboCards').hasComboLevel(0,3);
    cy.get("@comboCards").hasComboLevel(1,3);
    cy.get("@comboCards").hasComboLevel(3,2);
  });

  it("should filter all skills if none are comboable", () => {
    cy.get("@skillCards").selectSkill(0, "Sword", "DoubleSlash");

    cy.get("@skillCards").eq(1).contains("No Skill Selected").click();
    cy.get("@skillCards").eq(1).contains("Combo Skills Only").click();
    cy.get("@skillCards").eq(1).contains("No skills selectable").should("exist");
  });

  it("Combo Skills Only should filter skills based on previous skill", () => {
    cy.get("@skillCards").selectSkill(0, "Sword", "Thrust");
    
    cy.get("@skillCards").eq(1).contains("No Skill Selected").click();
    cy.get("@skillCards").eq(1).contains("Sword").click();
    cy.get("@skillCards").eq(1).contains("StunSlash").should("exist");
    cy.get("@skillCards").eq(1).contains("Combo Skills Only").click();
    cy.get("@skillCards").eq(1).contains("StunSlash").should("not.exist");
  });

});
