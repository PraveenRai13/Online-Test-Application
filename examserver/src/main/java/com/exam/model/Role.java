package com.exam.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="roles")
public class Role {

	@Id
	private Long roleId;
	private String roleName;
	
	@OneToMany(cascade= CascadeType.ALL,fetch = FetchType.LAZY,mappedBy="role") // means Role cha id column UserRole madhe asel
	private Set<UserRole> userRoels=new HashSet<>();
	
	
	
	public Set<UserRole> getUserRoels() {
		return userRoels;
	}
	public void setUserRoels(Set<UserRole> userRoels) {
		this.userRoels = userRoels;
	}
	public Role() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getRoleId() {
		return roleId;
	}
	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public Role(Long roleId, String roleName) {
		super();
		this.roleId = roleId;
		this.roleName = roleName;
	}
	
	
	
}
